import { connectToDatabase } from "./db";

export const getAllSubjects = async () => {
  // Connect to db
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    return "Cannot connect to database. Try again in a minute.";
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
      ])
      .toArray();

    client.close();
    return subjects;
  } catch (error) {
    client?.close();
    return [];
  }
};
