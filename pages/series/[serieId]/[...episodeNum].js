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
  const serieData = await getSerieById(serieId);

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
