import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import TreeViewContainer from "./TreeViewContainer";
import ActionButtons from "./ActionButtons";
import classes from "./ManagerContainer.module.css";
const ManagerContainer = () => {
  return (
    <div className={classes.container}>
      <AnimatePresence>
        <Link key="title" href="/content-manager">
          <h1 className="main-clip-text">Content Manager</h1>
        </Link>
        <ActionButtons />
        <motion.div
          key="content"
          layout
          className={classes["content__container"]}
        >
          <TreeViewContainer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ManagerContainer;
