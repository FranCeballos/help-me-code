import React from "react";
import classes from "./LevelsContainer.module.css";
import { useSelector } from "react-redux";

const LevelsContainer = (props) => {
  const { level } = useSelector((state) => state.manager.selectedNodeId);

  const content = {
    SUBJECT: <p>Subject</p>,
    CATEGORY: <p>Category</p>,
    ROOT: <p>Root</p>,
  };
  return <div className={classes.container}>{content[level]}</div>;
};

export default LevelsContainer;
