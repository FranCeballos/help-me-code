import Serie from "../../../components/serie/Serie";
import HeadComponent from "@/components/head/Head";
import NavBarLayout from "@/components/layout/NavBarLayout";
import { getAllSeries } from "@/lib/series";
import classes from "../../../components/serie/Serie.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ObjectId } from "mongodb";

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
  const seriesData = await getAllSeries({}, { _id: 1 });
  const pathsWithParams = seriesData.map((serieId) => ({
    params: { serieId: serieId._id },
  }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const serieId = context.params.serieId;
  const [serie] = await getAllSeries({ _id: new ObjectId(serieId) });

  if (!serie._id) {
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
