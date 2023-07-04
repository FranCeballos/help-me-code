import { motion, useMotionValue } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SliderItem from "./SliderItem";
import classes from "./Slider.module.css";
import { useState } from "react";

const Slider = (props) => {
  const seriesLength = props.seriesData.length;
  const sliderMaxPositionValue = Math.floor((seriesLength - 1) / 4) * -100;

  const sliderPosition = useMotionValue(0);
  const [xPosition, setXPosition] = useState(sliderPosition.get());

  const handlePrev = () => {
    if (sliderPosition.get() < 0) {
      sliderPosition.set(sliderPosition.get() + 100);
      setXPosition(sliderPosition.get());
    }
  };

  const handleNext = () => {
    if (sliderPosition.get() > sliderMaxPositionValue) {
      sliderPosition.set(sliderPosition.get() - 100);
      setXPosition(sliderPosition.get());
    } else {
      sliderPosition.set(0);
      setXPosition(sliderPosition.get());
    }
  };
  return (
    <div className={classes["container"]}>
      <h3 className={classes["row__title"]}>{props.title}</h3>
      <div className={classes["slider__container"]}>
        {sliderPosition.get() !== 0 ? (
          <motion.div
            className={`${classes["handle"]} ${classes["handlePrev"]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handlePrev}
          >
            <ArrowBackIosNewIcon style={{ color: "white", fontSize: "2vw" }} />
          </motion.div>
        ) : (
          <motion.div
            className={`${classes["handle"]} ${classes["disabled"]}`}
            initial={false}
            animate={{ opacity: 0 }}
          >
            <ArrowBackIosNewIcon style={{ color: "white", fontSize: "2vw" }} />
          </motion.div>
        )}
        <motion.div
          className={classes["slider"]}
          animate={{ translateX: `${xPosition}%` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
        >
          {props.seriesData.map((serie) => (
            <SliderItem key={serie._id} seriesData={serie} />
          ))}
        </motion.div>
        <div
          className={`${classes["handle"]} ${classes["handleNext"]}`}
          onClick={handleNext}
        >
          <ArrowForwardIosIcon style={{ color: "white", fontSize: "2vw" }} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
