import { ObjectId } from "mongodb";
import { connectToDatabase } from "./db";

export const getUser = async (filter = {}, fields = {}, stringId = true) => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db();
    const user = await db
      .collection("users")
      .find(filter)
      .project(fields)
      .toArray();
    let returnedUser = user;

    if (stringId) {
      returnedUser = user.map((user) => {
        return { ...user, _id: String(user._id) };
      });
    }
    if (!returnedUser) {
      throw new Error("User not found");
    }
    client.close();
    return returnedUser;
  } catch (error) {
    client?.close();
    return error.message;
  }
};

export const addOrDeleteFavToUser = async (userId, serieId, addToFavs) => {
  let client;
  try {
    const [user] = await getUser({ _id: new ObjectId(userId) }, { favList: 1 });
    const allFavsArray = user.favList;
    const isAlreadyInFavs = allFavsArray.includes(serieId);

    let newFavsArray;
    let message;

    if (addToFavs) {
      if (isAlreadyInFavs) {
        const error = new Error("Serie already in favs");
        error.status = 403;
        throw error;
      }
      newFavsArray = [...allFavsArray, serieId];
      message = "Serie added to favs";
    } else {
      if (!isAlreadyInFavs) {
        const error = new Error(
          "Can't delete from favs because it wasn't found in favs"
        );
        error.status = 403;
        throw error;
      }
      message = "Serie deleted from favs";
      newFavsArray = allFavsArray.filter((fav) => fav !== serieId);
    }

    client = await connectToDatabase();
    const db = client.db();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: { favList: newFavsArray } }
      );
    result.message = message;
    client.close();
    return { message: message, error: false };
  } catch (error) {
    client?.close();
    return { message: error.message, error: true, status: error.status };
  }
};

export const checkIfResetTokenExpired = async (token, email) => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db();

    const expirationDate = await db
      .collection("users")
      .find({
        email,
        resetTokenExpiration: { $gt: Date.now() },
        resetToken: token,
      })
      .project({ _id: 1 })
      .toArray();

    const [transformedExpirationDate] = expirationDate.map((user) => {
      return {
        _id: String(user._id),
      };
    });
    transformedExpirationDate.error = false;
    client.close();
    return transformedExpirationDate || null;
  } catch (error) {
    client?.close()
    return { error: true };
  }
};
