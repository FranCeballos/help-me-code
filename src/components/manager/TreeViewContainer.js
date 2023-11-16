import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { renderTree } from "@/src/lib/renderTree";

import classes from "./TreeViewContainer.module.css";
import { useGetAllSubjectsQuery } from "@/src/features/api/subjectsApiSlice";
import { CircularProgress } from "@mui/material";

const TreeViewContainer = () => {
  const { data, isLoading } = useGetAllSubjectsQuery();
  console.log(data);
  const treeData = {
    id: "root",
    name: "Front End",
    children: data?.subjects.map((item, index) => ({
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
        sx={{ minHeight: 500, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {isLoading ? <CircularProgress size={30} /> : renderTree(treeData)}
      </TreeView>
    </div>
  );
};

export default TreeViewContainer;
