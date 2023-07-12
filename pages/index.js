import NavBarLayout from "../components/layout/NavBarLayout";
import HeadComponent from "../components/head/Head";
import RowsContainer from "../components/slider/RowsContainer";

import classes from "../components/home/HomePage.module.css";
import { getAllSeries } from "@/lib/series";

const HomePage = (props) => {
  const posterSrc = "./home/solid-black.jpeg";
  return (
    <>
      <HeadComponent
        title="C3 Plus"
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
            playsInline
          >
            <source src="/home/mainc3plus.mp4" type="video/mp4" />
          </video>
        </div>
        <RowsContainer seriesData={props.allSeries} />
      </NavBarLayout>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const allSeries = await getAllSeries(
      {},
      { _id: 1, imageUrl: 1, name: 1, category: 1 }
    );
    return {
      props: {
        allSeries: JSON.parse(JSON.stringify(allSeries)),
      },
      revalidate: 600,
    };
  } catch (error) {
    return {
      props: {
        allSeries: ["Something went wrong"],
      },
    };
  }
};

export default HomePage;
