import classes from "./EpisodeInfo.module.css";

const EpisodeInfo = ({ episodeTitle, serieTitle }) => {
  return (
    <div className={classes["info__container"]}>
      <div className={classes["info__serie"]}>{serieTitle}</div>
      <div className={classes["info__episode"]}>{episodeTitle}</div>
      <div className={classes["info__empty"]}></div>
    </div>
  );
};

export default EpisodeInfo;
