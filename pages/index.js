import { useState } from "react";
import classes from "../components/home/HomePage.module.css";
const HomePage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const posterSrc = "./solid-black.jpeg";
  const videoSrc = "./mainc3plus.mp4";

  const handleVideoLoaded = () => setIsVideoLoaded(true);

  return (
    <section className={classes.home}>
      <div className={classes["pic-box"]}>
        {/* {!isVideoLoaded && (
          <img className={classes.video} src={posterSrc} alt="Poster image" />
        )} */}
        <video
          className={classes["video"]}
          poster={posterSrc}
          autoPlay
          muted
          loop
        >
          <source src="/mainc3plus.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default HomePage;
