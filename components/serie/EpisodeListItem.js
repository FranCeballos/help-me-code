import { motion } from "framer-motion";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import classes from "./EpisodeListItem.module.css";
import { useState } from "react";

const playIconVariant = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
};

const imageVariant = {
  rest: {
    opacity: 1,
  },
  hover: {
    opacity: 0.5,
  },
};

const EpisodeListItem = (props) => {
  const episodeData = props.episodeData;
  console.log(episodeData);

  return (
    <motion.div
      className={classes["episode__box"]}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className={classes["episode__num-box"]}>
        <p className={classes["episode__num"]}>{episodeData.episodeNum}</p>
      </div>
      <div className={classes["episode__img-box"]}>
        <motion.div
          className={classes["play__icon"]}
          variants={playIconVariant}
        >
          <PlayCircleOutlinedIcon
            style={{
              position: "absolute",
              color: "#fff",
              fontSize: 50,
            }}
          />
        </motion.div>
        <motion.img
          variants={imageVariant}
          src={episodeData.imageUrl}
          className={classes["episode__img"]}
          alt={episodeData.name}
        />
      </div>
      <div className={classes["episode__data-container"]}>
        <div className={classes["episode__data-box-1"]}>
          <h5 className={classes["episode__title"]}>{episodeData.name}</h5>
          <p className={classes["episode__duration"]}>
            {episodeData.videoDuration}
          </p>
        </div>
        <div className={classes["episode__description-box"]}>
          <h6 className={classes["episode__description"]}>
            {episodeData.description}
          </h6>
        </div>
      </div>
    </motion.div>
  );
};

export default EpisodeListItem;
