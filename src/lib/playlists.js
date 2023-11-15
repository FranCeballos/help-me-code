import { connectToDatabase } from "./db";

export const getAllPlaylists = async () => {
  // Connect to db
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db();
    const playlists = await db.collection("playlists").find().toArray();

    const playlistsPromises = await playlists.map(async (playlist) => {
      try {
        const response = await fetch(
          `${process.env.YOUTUBE_GET_PLAYLIST_URL}${playlist.youtubeId}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        return undefined;
      }
    });

    const filledPlaylists = await Promise.all(playlistsPromises);

    client.close();
    return filledPlaylists;
  } catch (error) {
    client?.close();
    return error;
  }
};
