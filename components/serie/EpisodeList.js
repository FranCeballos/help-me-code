import classes from "./EpisodeList.module.css";
import EpisodeListItem from "./EpisodeListItem";

const EpisodeList = ({ episodesData, serieId, selectedEpisode, fullBlack }) => {
  return (
    <div className={classes["serie__episodes-box"]}>
      {episodesData.map((episode) => (
        <EpisodeListItem
          key={episode._id}
          episodeData={episode}
          serieId={serieId}
          selectedEpisode={selectedEpisode}
          fullBlack={fullBlack}
        />
      ))}
    </div>
  );
};

export default EpisodeList;
