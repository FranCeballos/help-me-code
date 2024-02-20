import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";

import classes from "./ReorderList.module.css";

const ReorderList = ({ items, onChange }) => {
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
        <Reorder.Item key={item._id} value={item} className={classes.item}>
          <p>{index + 1}</p>
          <p>{item.title}</p>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default ReorderList;
