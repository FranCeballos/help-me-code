import React, { useEffect, useState } from "react";
import {
  useGetAllSubjectsQuery,
  useUpdateSubjectsOrderMutation,
} from "@/src/features/api/subjectsApiSlice";

import ReorderList from "../ReorderList";
import { Button, CircularProgress } from "@mui/material";
import classes from "../View.module.css";

const RootView = (props) => {
  const { data, isLoading, refetch, isFetching } = useGetAllSubjectsQuery();
  const [updateSubjectsOrder, result] = useUpdateSubjectsOrderMutation();

  const [items, setItems] = useState([]);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    setItems(data?.subjects);
  }, [data]);

  const saveHandler = async () => {
    const newOrder = items.map((item, index) => ({
      _id: item._id,
      newOrder: index,
    }));
    setChangesMade(false);
    const res = await updateSubjectsOrder({ items: newOrder });

    if (res?.data.isSuccess) {
      refetch();
    }
  };

  const changeOrderHandler = (newItems) => {
    setItems(newItems);
    if (!changesMade) setChangesMade(true);
  };

  return (
    <>
      <div className={classes.actions}>
        <h2 className={classes.title}>Subjects</h2>
        {!result.isLoading ? (
          <Button
            onClick={saveHandler}
            variant="contained"
            className={classes["button__save"]}
            disabled={!changesMade}
          >
            Save
          </Button>
        ) : (
          <CircularProgress size={25} />
        )}
      </div>
      {!isLoading && !result.isLoading && items.length > 0 && (
        <>
          <h3 className={classes.subtitle}>Reorder</h3>
          <ReorderList items={items} onChange={changeOrderHandler} />
        </>
      )}
      {isFetching && (
        <div className={classes["spinner__container"]}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default RootView;
