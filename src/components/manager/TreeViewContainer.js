import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";

import classes from "./TreeViewContainer.module.css";
import { renderTree } from "@/src/lib/renderTree";

const TreeViewContainer = ({ subjects }) => {
  const data = {
    id: "root",
    name: "Front End",
    children: subjects.map((item, index) => ({
      id: `${index + 1}_${item.customId}`,
      name: item.title,
      children: item.categoriesData.map((i, iIndex) => ({
        id: `${index + 1}.${iIndex + 1}_${i.customId}`,
        name: i.title,
      })),
    })),
  };
  return (
    <div className={classes.container}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default TreeViewContainer;
