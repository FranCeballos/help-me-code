import classes from "./SerieContent.module.css";
import EpisodeListItem from "./EpisodeListItem";
import EpisodeList from "./EpisodeList";

const SerieContent = (props) => {
  const serieData = props.serieData;
  const episodesData = serieData.episodes;

  return (
    <div className={classes["serie__content-box"]}>
      <div className={classes["serie__description-box"]}>
        <h2 className={classes["serie__description"]}>
          {serieData.description}
        </h2>
      </div>
      <div className={classes["serie__list-title-box"]}>
        <h4 className={classes["serie__list-title"]}>Episodios</h4>
      </div>
      {/* <div className={classes["serie__episodes-box"]}>
        {episodesData.map((episode) => (
          <EpisodeListItem
            key={episode._id}
            episodeData={episode}
            serieId={serieData._id}
          />
        ))}
      </div> */}
      <EpisodeList episodesData={episodesData} serieId={serieData._id} />
    </div>
  );
};

export default SerieContent;
