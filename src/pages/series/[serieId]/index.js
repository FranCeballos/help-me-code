import { motion, AnimatePresence } from "framer-motion";

import Serie from "@/src/components/serie/Serie";
import HeadComponent from "@/src/components/head/Head";
import NavBarLayout from "@/src/components/layout/NavBarLayout";

import classes from "@/src/components/serie/Serie.module.css";

const SeriePage = (props) => {
  return (
    <>
      <HeadComponent title="" description=""></HeadComponent>
      <NavBarLayout>
        {/* <AnimatePresence mode="wait">
          <motion.div
            className={classes["serie__container"]}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1, type: "spring" }}
          >
            <Serie serieData={serieData} />
          </motion.div>
        </AnimatePresence> */}
      </NavBarLayout>
    </>
  );
};

export const getStaticPaths = async () => {
  const seriesData = [];
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
  const serie = [];

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
