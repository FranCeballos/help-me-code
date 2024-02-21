import { connectToDatabase } from "@/src/lib/db";
import { createCustomId } from "@/src/lib/formaters";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { title, subject } = req.body;
    const customId = createCustomId(title);
    // Connect to db
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error connecting to database. Try again in a few minutes.",
      });
    }
    const session = await client.startSession();
    const db = client.db();

    // create category and add to subject
    try {
      const subjectData = await db
        .collection("subjects")
        .find({ customId: subject })
        .project({ categories: 1 })
        .toArray();

      if (subjectData.length === 0) {
        throw new Error("Subject not found.");
      }

      const categoriesLength = subjectData[0].categories.length;
      const order = categoriesLength > 0 ? categoriesLength : 0;

      await session.withTransaction(async () => {
        await db.collection("categories").insertOne(
          {
            customId,
            title,
            playlists: [],
            order,
          },
          { session }
        );
        await db
          .collection("subjects")
          .updateOne(
            { customId: subject },
            { $push: { categories: customId } },
            { session }
          );
      });
    } catch (error) {
      await session?.endSession();
      await client?.close();
      return res.status(500).json({
        error: "Error connecting to database when creating a category.",
      });
    }

    await session.endSession();
    await client.close();
    return res.status(200).json({
      message: "Category created",
      category: {
        customId,
        title,
        playlists: [],
      },
      isSuccess: true,
    });
  }
};

export default handler;
