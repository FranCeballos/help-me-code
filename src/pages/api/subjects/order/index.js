import { connectToDatabase } from "@/src/lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { items } = req.body;
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

    // update order of subjects
    try {
      const bulkWriteParam = items.map((item) => ({
        updateOne: {
          filter: { _id: new ObjectId(item._id) },
          update: { $set: { order: item.newOrder } },
        },
      }));
      const response = await db
        .collection("subjects")
        .bulkWrite(bulkWriteParam);

      return res.status(200).json({
        message: "Order updated.",
        isSuccess: true,
        mongoDbResponse: response,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message, isSuccess: false });
    }
  }
};

export default handler;
