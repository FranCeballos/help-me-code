import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // Connect to db
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      return "Can't connect to database. Try again in a minute.";
    }
    const db = client.db();

    // Get all subjects
    try {
      const subjects = await db
        .collection("subjects")
        .aggregate([
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

      client.close();
      return res.status(200).json({ subjects });
    } catch (error) {
      client?.close();
      return res.status(500).json({ message: error.message });
    }
  }
  if (req.method === "POST") {
    const { title, role } = req.body;

    if (!title || !role) {
      return res.status(422).json({ error: "Missing field/s", body: req.body });
    }

    // Connect to db
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      return res.status(500).json({
        error: "Can't connect to database. Try again in a few minutes.",
      });
    }
    const db = client.db();

    const customId = title.trim().toLowerCase().replaceAll(" ", "-");

    // Check if doesn't already exists and create subject
    try {
      const subjectExists = await db
        .collection("subjects")
        .findOne({ customId });

      if (subjectExists) {
        throw new Error("Subject already exists");
      }

      await db.collection("subjects").insertOne({
        customId,
        title,
        role,
        categories: [],
      });

      client.close();
      return res
        .status(200)
        .json({ message: "Subject created.", isSuccess: true });
    } catch (error) {
      client?.close();
      return res.status(500).json({ message: error.message });
    }
  }
};
export default handler;
