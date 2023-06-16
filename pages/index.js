import NavBarLayout from "../components/layout/NavBarLayout";
import HeadComponent from "../components/head/Head";
import SlidersContainer from "../components/home/SlidersContainer";

import classes from "../components/home/HomePage.module.css";
const HomePage = () => {
  const posterSrc = "./home/solid-black.jpeg";

  return (
    <>
      <HeadComponent
        title="Inicio"
        description="En esta plataforma encontrarás contenido de series, cursos y podcast que te brindarán herramientas que fortalezcan tu vida y equipen tu llamado"
      ></HeadComponent>
      <NavBarLayout>
        <div className={classes["pic-box"]}>
          <div className={classes["video__overlay"]}></div>
          <video
            className={classes["video"]}
            poster={posterSrc}
            autoPlay
            muted
            loop
          >
            <source src="/home/mainc3plus.mp4" type="video/mp4" />
          </video>
        </div>
        <SlidersContainer />
      </NavBarLayout>
    </>
  );
};

export default HomePage;
