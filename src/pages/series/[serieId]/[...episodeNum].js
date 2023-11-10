import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { getAllSeries } from "@/src/lib/series";

import EpisodeContainer from "@/src/components/episode/EpisodeContainer";
import HeadComponent from "@/src/components/head/Head";
import NavBarLayout from "@/src/components/layout/NavBarLayout";

const EpisodePage = (props) => {
  const router = useRouter();
  const { episodeNum } = router.query;
  const parsedEpisodeNum = parseFloat(episodeNum);
  const serieData = props.serieData;
  const episodeData = serieData.episodes.find(
    (episode) => episode.episodeNum === parsedEpisodeNum
  );
  return (
    <>
      <HeadComponent
        title={episodeData.name}
        description={episodeData.description}
      ></HeadComponent>
      <NavBarLayout>
        <EpisodeContainer serieData={serieData} episodeData={episodeData} />
      </NavBarLayout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { serieId, episodeNum } = context.params;
  const [serieData] = await getAllSeries({ _id: new ObjectId(serieId) });
  const parsedEpisodeNum = parseFloat(episodeNum);
  const validEpisodeNum =
    parsedEpisodeNum !== NaN &&
    parsedEpisodeNum > 0 &&
    parsedEpisodeNum <= serieData.numOfEpisodes;

  if (!validEpisodeNum) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      serieData,
    },
  };
};

export default EpisodePage;
