import { connectToDatabase } from "@/src/lib/db";
import { createCustomId } from "@/src/lib/formaters";

const handler = async (req, res) => {
  // Connect to db
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    return res.status(500).json({
      error: "Fallo al conectar con la base de datos! Pruebe en un minuto",
    });
  }

  if (req.method === "GET") {
    const db = client.db();
    try {
      const { categoryId } = req.query;
      const category = await db
        .collection("categories")
        .findOne({ customId: categoryId });

      if (!category) {
        throw new Error(`Category with customId: "${categoryId}" not found.`);
      }

      client.close();
      return res.status(200).json({ isSuccess: true, category });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    const { categoryId } = req.query;
    const { title } = req.body;
    const customId = createCustomId(title);

    const session = await client.startSession();
    const db = client.db();

    try {
      const response = await session.withTransaction(async () => {
        const subject = await db
          .collection("subjects")
          .findOne({ categories: categoryId }, { session });

        const categoriesArray = subject.categories;
        const newCategoriesArray = categoriesArray.map((cat) =>
          cat === categoryId ? customId : cat
        );
        await db
          .collection("categories")
          .findOneAndUpdate(
            { customId: categoryId },
            { $set: { customId, title } },
            { session }
          );

        await db
          .collection("subjects")
          .findOneAndUpdate(
            { customId: subject.customId },
            { $set: { categories: newCategoriesArray } },
            { session }
          );
      });
      session.endSession();
      client.close();
      return res
        .status(200)
        .json({ isSuccess: true, mongoDbResponse: response });
    } catch (error) {
      session?.endSession();
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
