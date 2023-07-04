import EpisodeInfo from "./EpisodeInfo";
import EpisodeIframe from "./EpisodeIframe";
import EpisodeNavigation from "./EpisodeNavigation";
import EpisodeList from "../serie/EpisodeList";
import classes from "./EpisodeContainer.module.css";
import { motion } from "framer-motion";

const EpisodeContainer = (props) => {
  const serieData = props.serieData;
  const episodeData = props.episodeData;

  return (
    <motion.div
      className={classes["episode__container"]}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 1, type: "spring" }}
    >
      <EpisodeInfo
        episodeTitle={episodeData.name}
        serieTitle={serieData.name}
      ></EpisodeInfo>
      <EpisodeIframe
        episodeName={episodeData.name}
        videoUrl={episodeData.videoUrl}
      />
      <EpisodeNavigation
        serieData={serieData}
        episodeNum={episodeData.episodeNum}
      />
      <EpisodeList episodesData={serieData.episodes} serieId={serieData._id} />
    </motion.div>
  );
};

export default EpisodeContainer;
