import { connectToDatabase } from "@/src/lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { subjectId } = req.query;
    const { items } = req.body;
    console.log(subjectId);
    console.log(items);
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
      const bulkWriteParam = items.map((item) => ({
        updateOne: {
          filter: { _id: new ObjectId(item._id) },
          update: { $set: { order: item.newOrder } },
        },
      }));
      const response = await db
        .collection("categories")
        .bulkWrite(bulkWriteParam);

      client.close();
      return res
        .status(200)
        .json({ isSuccess: true, mongoDbResponse: response });
    } catch (error) {
      client?.close();
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
