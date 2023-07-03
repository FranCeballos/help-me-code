import { connectToDatabase } from "./db";
import { ObjectId } from "mongodb";

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

    const serie = await db
      .collection("series")
      .findOne({ _id: new ObjectId(serieId) });
    serie._id = String(serie._id);
    serie.episodes = serie.episodes.map((episode) => ({
      ...episode,
      _id: String(episode._id),
    }));

    client.close();
    return serie;
  } catch (error) {
    client.close();
    return error;
  }
};
