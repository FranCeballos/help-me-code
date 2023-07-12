import { connectToDatabase } from "./db";

export const getAllSeries = async (
  filter = {},
  fields = {},
  serieIdString = true,
  episodeIdsString = true
) => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db();
    const allSeries = await db
      .collection("series")
      .find(filter)
      .project(fields)
      .toArray();

    if (allSeries.length === 0) {
      throw new Error("No series found");
    }

    let returnedAllSeries = allSeries;

    if (serieIdString) {
      returnedAllSeries = returnedAllSeries.map((serie) => {
        return { ...serie, _id: String(serie._id) };
      });
    }

    if (episodeIdsString && returnedAllSeries[0].episodes) {
      returnedAllSeries = returnedAllSeries.map((serie) => {
        return {
          ...serie,
          episodes: serie.episodes.map((episode) => {
            return { ...episode, _id: String(episode._id) };
          }),
        };
      });
    }

    client.close();
    return returnedAllSeries;
  } catch (error) {
    client?.close();
    return error.message;
  }
};

export const getEpisodeById = async (serieId, episodeId) => {
  try {
    const serie = await getSerieById(serieId);
    const episodeData = serie.episodes.find(
      (episode) => episode._id === episodeId
    );

    return episodeData;
  } catch (error) {
    return error;
  }
};

export const getEpisodeByNum = async (serieId, episodeNum) => {
  try {
    const serie = await getSerieById(serieId);
    const episodeData = serie.episodes.find(
      (episode) => episode.episodeNum === episodeNum
    );
    return { ...episodeData, serieName: serie.name };
  } catch (error) {
    return error;
  }
};
