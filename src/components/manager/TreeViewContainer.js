import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllSubjectsQuery } from "@/src/features/api/subjectsApiSlice";
import { setSelectedNodeId } from "@/src/features/states/adminSlice";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { renderTree } from "@/src/lib/renderTree";
import { CircularProgress } from "@mui/material";

import classes from "./TreeViewContainer.module.css";

const TreeViewContainer = () => {
  const { data, isLoading } = useGetAllSubjectsQuery();
  const dispatch = useDispatch();
  const selectedNodeId = useSelector((state) => state.manager.selectedNodeId);

  const treeData = {
    id: "ROOT",
    name: "Front End",
    children: data?.subjects.map((item, index) => ({
      id: `SUBJECT_${item.customId}`,
      name: item.title,
      children: item.categoriesData.map((i, iIndex) => ({
        id: `CATEGORY_${i.customId}`,
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
        onNodeSelect={(_, nodeId) => dispatch(setSelectedNodeId(nodeId))}
        sx={{ minHeight: 500, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {isLoading ? <CircularProgress size={30} /> : renderTree(treeData)}
      </TreeView>
    </div>
  );
};

export default TreeViewContainer;
