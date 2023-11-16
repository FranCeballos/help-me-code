import { getAllPlaylists } from "../lib/playlists";

import NavBarLayout from "../components/layout/NavBarLayout";
import HeadComponent from "../components/head/Head";
import RowsContainer from "../components/slider/RowsContainer";

import classes from "../components/home/HomePage.module.css";

const HomePage = ({ playlistsData }) => {
  const posterSrc = "./home/solid-black.jpeg";
  const playlists = JSON.parse(playlistsData);

  return (
    <>
      <HeadComponent
        title="Help Me Code"
        description="The best YouTube programming videos. All in one place."
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
            <source src="/home/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <RowsContainer data={playlists} />
      </NavBarLayout>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const playlists = await getAllPlaylists();
    return {
      props: {
        playlistsData: JSON.stringify(playlists),
      },
      revalidate: 600,
    };
  } catch (error) {
    return {
      props: {
        playlistsData: ["Something went wrong"],
      },
    };
  }
};

export default HomePage;
