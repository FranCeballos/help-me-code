import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import classes from "./TreeViewContainer.module.css";

const TreeViewContainer = ({ subjects }) => {
  return (
    <div className={classes.container}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <TreeItem nodeId="1" label="Front End">
          {subjects
            ? subjects.map((item, index) => (
                <TreeItem
                  key={`1.${index}`}
                  nodeId={`1.${index}`}
                  label={item.title}
                >
                  {item.categoriesData.map((ctg, ctgIndex) => (
                    <TreeItem
                      key={`1.${index}.${ctgIndex}`}
                      nodeId={`1.${index}.${ctgIndex}`}
                      label={ctg.title}
                    />
                  ))}
                </TreeItem>
              ))
            : null}
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default TreeViewContainer;
