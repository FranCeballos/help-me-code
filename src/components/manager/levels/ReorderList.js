import React from "react";
import { Reorder } from "framer-motion";
import { useRouter } from "next/router";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import classes from "./ReorderList.module.css";

const ReorderList = ({ items, onChange }) => {
  const { push } = useRouter();
  const setItems = (newOrder) => {
    onChange(newOrder);
  };

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className={classes.container}
    >
      {items.map((item, index) => (
        <Reorder.Item
          key={item._id}
          value={item}
          className={classes["item__container"]}
        >
          <p>{index + 1}</p>
          <p>{item.title}</p>
          <div className={classes["actions__container"]}>
            <IconButton
              aria-label="edit"
              onClick={() =>
                push(
                  `/content-manager?edit-category=${item.customId}`,
                  undefined,
                  { shallow: true }
                )
              }
            >
              <EditIcon />
            </IconButton>
            {/* <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton> */}
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default ReorderList;
