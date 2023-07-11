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

export const getUserIdByEmail = async (userEmail) => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db();
    const userIdArray = await db
      .collection("users")
      .find({ email: userEmail })
      .project({ _id: 1 })
      .toArray();
    const userId = userIdArray[0]?._id;
    console.log(userId);
    if (!userId) {
      throw new Error("User not found");
    }

    client.close();
    return String(userId);
  } catch (error) {
    client?.close();
    return { message: error.message, error: true };
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
    return { message: error.message };
  }
};

const getAllFavsData = async (userId) => {
  let client;
  try {
    const userFavsIdsString = await getAllFavs(userId);
    const userFavsIds = userFavsIdsString.map((id) => new ObjectId(id));
    client = await connectToDatabase();
    const db = client.db();
    const favsData = await db
      .collection("series")
      .find({ _id: { $in: userFavsIds } })
      .project({ _id: 1, name: 1, imageUrl: 1 })
      .toArray();
    const favsDataStringId = favsData.map((fav) => {
      return { ...fav, _id: String(fav._id) };
    });

    return favsDataStringId;
  } catch (error) {}
};

export const getAllFavsDataByEmail = async (userEmail) => {
  try {
    const userId = await getUserIdByEmail(userEmail);
    const favsData = await getAllFavsData(userId);
    return favsData;
  } catch (error) {
    return { message: error.message };
  }
};

export const getAllFavsByEmail = async (userEmail) => {
  try {
    const user = await getUserByEmail(userEmail);
    console.log(user);
    const allFavsArray = await getAllFavs(user._id);
    console.log(allFavsArray);
    return allFavsArray;
  } catch (error) {
    return { message: error.message };
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

export const checkIfResetTokenExpired = async (token, email) => {
  try {
    const client = await connectToDatabase();
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
    console.log(transformedExpirationDate);

    return transformedExpirationDate || null;
  } catch (error) {
    return { error: true };
  }
};
