import EpisodeContainer from "@/components/episode/EpisodeContainer";
import HeadComponent from "@/components/head/Head";
import NavBarLayout from "@/components/layout/NavBarLayout";
import { getSerieById } from "@/lib/series";
import { useRouter } from "next/router";

const EpisodePage = (props) => {
  const router = useRouter();
  const { episodeNum } = router.query;
  const parsedEpisodeNum = parseFloat(episodeNum);
  const serieData = props.serieData;
  const episodeData = serieData.episodes.find(
    (episode) => episode.episodeNum === parsedEpisodeNum
  );
  console.log(serieData);
  console.log(episodeData);
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
  console.log(serieId, parseFloat(episodeNum[0]));
  const serieData = await getSerieById(serieId);
  console.log(serieData);

  if (!serieData) {
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
