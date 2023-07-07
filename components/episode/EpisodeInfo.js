import Link from "next/link";
import { motion } from "framer-motion";
import classes from "./EpisodeInfo.module.css";

const EpisodeInfo = ({ episodeTitle, serieTitle, serieId }) => {
  return (
    <div className={classes["info__container"]}>
      <Link
        href={`/series/${serieId}`}
        className={`${classes["info__serie"]} link__style-off`}
      >
        <motion.p whileHover={{ color: "grey" }}>{serieTitle}</motion.p>
      </Link>
      <div className={classes["info__episode"]}>{episodeTitle}</div>
      <div className={classes["info__empty"]}></div>
    </div>
  );
};

export default EpisodeInfo;
