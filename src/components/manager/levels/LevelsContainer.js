import React from "react";
import { useSelector } from "react-redux";
import SubjectView from "./subject/SubjectView";
import CategoryView from "./category/CategoryView";
import RootView from "./root/RootView";
import classes from "./LevelsContainer.module.css";

const LevelsContainer = (props) => {
  const { level } = useSelector((state) => state.manager.selectedNodeId);

  const content = {
    ROOT: <RootView />,
    SUBJECT: <SubjectView />,
    CATEGORY: <CategoryView />,
  };
  return <div className={classes.container}>{content[level]}</div>;
};

export default LevelsContainer;
