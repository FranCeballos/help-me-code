import { connectToDatabase } from "@/src/lib/db";
const handler = async (req, res) => {
  if (req.method === "GET") {
    const { subjectId } = req.query;
    // Connect to db
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      return res.status(500).json({
        error: "Fallo al conectar con la base de datos! Pruebe en un minuto",
      });
    }
    const db = client.db();

    try {
      const subject = await db
        .collection("subjects")
        .aggregate([
          { $match: { customId: subjectId } },
          {
            $lookup: {
              from: "categories",
              localField: "categories",
              foreignField: "customId",
              as: "categoriesData",
            },
          },
          {
            $addFields: {
              categoriesData: {
                $sortArray: {
                  input: "$categoriesData",
                  sortBy: { order: 1 },
                },
              },
            },
          },
        ])
        .toArray();
      return res
        .status(200)
        .json({ isSuccess: true, subject: subject[0] || null });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
