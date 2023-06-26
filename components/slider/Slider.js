import { useState } from "react";
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SliderItem from "./SliderItem";
import classes from "./Slider.module.css";

const serieObjectLayout = {
  _id: "Asdasdadasd",
  name: "Pista de Crecimiento",
  description: "Una serie sobre las clases Conectar, Crecer, Equipar y Servir",
  category: "acerca",
  imageUrl: "/series/pista-de-crecimiento/main.jpeg",
  numOfEpisodes: 4,
  episodes: [
    {
      _id: "asdasdsad",
      name: "Conecto",
      description: "Conoce todo acerca de C3",
      imageUrl: "/series/pista-de-crecimiento/conectar.jpeg",
      videoUrl: "https://www.vimeo.com/c3plus/pista-de-crecimiento/conectar",
    },
    {
      _id: "asdasdsad",
      name: "Conecto",
      description: "Conoce todo acerca de C3",
      imageUrl: "/series/pista-de-crecimiento/conectar.jpeg",
      videoUrl: "https://www.vimeo.com/c3plus/pista-de-crecimiento/conectar",
    },
  ],
};

const Slider = () => {
  const series = [
    { _id: "1", imageUrl: "https://fakeimg.pl/210/7dff93/909090?text=1" },
    { _id: "2", imageUrl: "https://fakeimg.pl/220/7dff93/909090?text=2" },
    { _id: "3", imageUrl: "https://fakeimg.pl/230/7dff93/909090?text=3" },
    { _id: "4", imageUrl: "https://fakeimg.pl/240/7dff93/909090?text=4" },
    { _id: "5", imageUrl: "https://fakeimg.pl/250/7dff93/909090?text=5" },
    { _id: "6", imageUrl: "https://fakeimg.pl/260/7dff93/909090?text=6" },
    { _id: "7", imageUrl: "https://fakeimg.pl/270/7dff93/909090?text=7" },
    { _id: "8", imageUrl: "https://fakeimg.pl/280/7dff93/909090?text=8" },
    { _id: "9", imageUrl: "https://fakeimg.pl/290/7dff93/909090?text=9" },
  ];

  const [sliderPosition, setSliderPosition] = useState(0);

  let sliderPositionString = `0%`;
  const isPositionLimit = sliderPosition === Math.ceil(series.length / 4);

  if (!isPositionLimit) {
    sliderPositionString = `-${sliderPosition * 100}%`;
  } else {
    sliderPositionString = `-0%`;
    setSliderPosition(0);
  }

  const handlePrev = () => {
    setSliderPosition((prev) => prev - 1);
  };

  const handleNext = () => {
    setSliderPosition((prev) => prev + 1);
  };

  return (
    <div className={classes["container"]}>
      <h3 className={classes["row__title"]}>Title</h3>
      <div className={classes["slider__container"]}>
        {sliderPosition > 0 ? (
          <div
            className={`${classes["handle"]} ${classes["handlePrev"]}`}
            onClick={handlePrev}
          >
            <ArrowBackIosNewIcon style={{ color: "white", fontSize: "2vw" }} />
          </div>
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
          animate={{ x: sliderPositionString }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
        >
          {series.map((serie) => (
            <SliderItem key={serie._id} data={serie} />
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
