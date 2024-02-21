import React from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import classes from "./ModalWrapper.module.css";

const ModalWrapper = ({ children, urlQuery }) => {
  const { query } = useRouter();
  const value = query[urlQuery];
  return (
    <AnimatePresence mode="wait">
      {value ? (
        <motion.div
          className={classes.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ModalWrapper;
