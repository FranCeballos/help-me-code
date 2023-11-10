import Script from "next/script";
import classes from "./EpisodeIframe.module.css";

const EpisodeIframe = ({ episodeName, videoUrl }) => {
  return (
    <>
      <div className={classes["iframe__container"]}>
        <iframe
          src={videoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={classes["iframe"]}
          title={episodeName}
        ></iframe>
      </div>
      <Script
        strategy="lazyOnLoad"
        src="https://player.vimeo.com/api/player.js"
      />
    </>
  );
};

export default EpisodeIframe;
