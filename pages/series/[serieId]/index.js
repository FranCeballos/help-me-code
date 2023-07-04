import Serie from "../../../components/serie/Serie";
import HeadComponent from "@/components/head/Head";
import NavBarLayout from "@/components/layout/NavBarLayout";
import { getAllSeries, getSerieById } from "@/lib/series";
import classes from "../../../components/serie/Serie.module.css";
import { motion, AnimatePresence } from "framer-motion";

const SeriePage = (props) => {
  const serieData = props.serieData;
  return (
    <>
      <HeadComponent
        title={serieData.name}
        description={serieData.description}
      ></HeadComponent>
      <NavBarLayout>
        <AnimatePresence mode="wait">
          <motion.div
            className={classes["serie__container"]}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1, type: "spring" }}
          >
            <Serie serieData={serieData} />
          </motion.div>
        </AnimatePresence>
      </NavBarLayout>
    </>
  );
};

export const getStaticPaths = async () => {
  const seriesData = await getAllSeries();
  const seriesIds = seriesData.map((serie) => String(serie._id));
  const pathsWithParams = seriesIds.map((serieId) => ({ params: { serieId } }));
  console.log(pathsWithParams);

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const serieId = context.params.serieId;
  console.log(serieId);

  const serie = await getSerieById(serieId);

  console.log(serie);

  if (!serie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      serieData: serie,
    },
    revalidate: 60,
  };
};

export default SeriePage;
