import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { title, subject } = req.body;
    const customId = title.toLowerCase().replaceAll(" ", "-");
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
    const db = client.db();

    // create category
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
      console.log("order", order);
      await db.collection("categories").insertOne({
        customId,
        title,
        playlists: [],
        order,
      });
    } catch (error) {
      return res.status(500).json({
        error:
          "Error connecting to database when creating the category document.",
      });
    }

    // add category to subject
    try {
      await db
        .collection("subjects")
        .updateOne({ customId: subject }, { $push: { categories: customId } });
    } catch (error) {
      return res.status(500).json({
        error:
          "Error connecting to database when adding the category a subject.",
      });
    }

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
