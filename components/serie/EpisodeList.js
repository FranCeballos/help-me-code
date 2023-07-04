import classes from "./EpisodeList.module.css";
import EpisodeListItem from "./EpisodeListItem";

const EpisodeList = ({ episodesData, serieId }) => {
  return (
    <div className={classes["serie__episodes-box"]}>
      {episodesData.map((episode) => (
        <EpisodeListItem
          key={episode._id}
          episodeData={episode}
          serieId={serieId}
        />
      ))}
    </div>
  );
};

export default EpisodeList;
