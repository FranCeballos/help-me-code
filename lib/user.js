import { ObjectId } from "mongodb";
import { connectToDatabase } from "./db";

export const getUserById = async (userId) => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      throw new Error("User not found");
    }
    client.close();
    return user;
  } catch (error) {
    client?.close();
    return error.message;
  }
};

export const getUserByEmail = async (userEmail) => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db();
    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }
    client.close();
    return user;
  } catch (error) {
    client?.close();
    return error.message;
  }
};

export const getAllFavs = async (userId) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    const userFavs = user.favList;

    return userFavs;
  } catch (error) {
    return error;
  }
};

export const addFavToUser = async (userId, serieId) => {
  let client;
  try {
    const allFavsArray = await getAllFavs(userId);
    const isAlreadyInFavs = allFavsArray.includes(serieId);

    if (isAlreadyInFavs) {
      const error = new Error("Serie already in favs");
      error.status = 403;
      throw error;
    }

    const newFavsArray = [...allFavsArray, serieId];
    client = await connectToDatabase();
    const db = client.db();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: { favList: newFavsArray } }
      );
    client.close();
    return { result, error: false };
  } catch (error) {
    client?.close();
    return { message: error.message, error: true, status: error.status };
  }
};

export const deleteFavFromUser = async (userId, serieId) => {
  let client;
  try {
    const allFavsArray = await getAllFavs(userId);
    const isAlreadyInFavs = allFavsArray.includes(serieId);

    if (!isAlreadyInFavs) {
      const error = new Error("Serie is not in favs");
      error.status = 403;
      throw error;
    }

    const newFavsArray = allFavsArray.filter((fav) => fav !== serieId);

    client = await connectToDatabase();
    const db = client.db();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: { favList: newFavsArray } }
      );
    client.close();
    return { result, error: false };
  } catch (error) {
    client?.close();
    return { message: error.message, error: true, status: error.status };
  }
};
