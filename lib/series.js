import { connectToDatabase } from "./db";

export const getAllSeries = async () => {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const allSeries = await db.collection("series").find().toArray();

    client.close();
    return allSeries;
  } catch (error) {
    console.log("Error");
    client.close();
    return error;
  }
};

export const getSerieById = async (serieId) => {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    const serie = await db.collection("series").findOne({ _id: serieId });

    client.close();
    return serie;
  } catch (error) {
    client.close();
    return error;
  }
};
