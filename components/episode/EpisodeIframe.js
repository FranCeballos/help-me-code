import classes from "./EpisodeIframe.module.css";

const EpisodeIframe = ({ episodeName, videoUrl }) => {
  return (
    <>
      <div className={classes["iframe__container"]}>
        <iframe
          src={videoUrl}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          className={classes["iframe"]}
          title={episodeName}
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  );
};

export default EpisodeIframe;
