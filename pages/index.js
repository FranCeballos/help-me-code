import NavBarLayout from "../components/layout/NavBarLayout";
import HeadComponent from "../components/head/Head";
import RowsContainer from "../components/slider/RowsContainer";
import { motion } from "framer-motion";

import classes from "../components/home/HomePage.module.css";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const HomePage = () => {
  const posterSrc = "./home/solid-black.jpeg";

  return (
    <>
      <HeadComponent
        title="Inicio"
        description="En esta plataforma encontrarás contenido de series, cursos y podcast que te brindarán herramientas que fortalezcan tu vida y equipen tu llamado"
      ></HeadComponent>
      <NavBarLayout>
        <motion.div className={classes.background} variants={sidebar} />
        <div className={classes["pic-box"]}>
          <div className={classes["video__overlay"]}></div>
          <video
            className={classes["video"]}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/home/mainc3plus.mp4" type="video/mp4" />
          </video>
        </div>
        <RowsContainer />
      </NavBarLayout>
    </>
  );
};

export default HomePage;
