import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllSubjectsQuery,
  useLazyGetSubjectByIdQuery,
} from "@/src/features/api/subjectsApiSlice";
import { useUpdateCategoriesOrderMutation } from "@/src/features/api/subjectsApiSlice";

import { Button, CircularProgress } from "@mui/material";
import ReorderList from "../ReorderList";
import classes from "../View.module.css";
import ModalEditCategory from "./ModalEditCategory";

const SubjectView = (props) => {
  const { name: subjectId } = useSelector(
    (state) => state.manager.selectedNodeId
  );
  const { refetch } = useGetAllSubjectsQuery();
  const [
    fetchSubjectById,
    { isLoading: fetchSubjectByIdIsLoading, data, isFetching },
  ] = useLazyGetSubjectByIdQuery();
  const [updateCategoriesOrder, { isLoading: updateCategoriesOrderIsLoading }] =
    useUpdateCategoriesOrderMutation();

  const [items, setItems] = useState([]);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    const fetchSubjectByIdOnChange = async () => {
      if (subjectId) {
        await fetchSubjectById(subjectId);
      }
    };

    fetchSubjectByIdOnChange();
  }, [subjectId]);

  useEffect(() => {
    if (data) setItems(data.subject.categoriesData);
  }, [data]);

  const saveHandler = async () => {
    const newOrder = items.map((item, index) => ({
      _id: item._id,
      newOrder: index,
    }));
    setChangesMade(false);
    const res = await updateCategoriesOrder({ items: newOrder, subjectId });

    if (res?.data?.isSuccess) {
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
        <h2 className={classes.title}>Category</h2>
        {!updateCategoriesOrderIsLoading ? (
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
      {!fetchSubjectByIdIsLoading &&
        !updateCategoriesOrderIsLoading &&
        !isFetching &&
        items.length > 0 && (
          <>
            <h3 className={classes.subtitle}>{data.subject.title}</h3>
            <ReorderList items={items} onChange={changeOrderHandler} />
          </>
        )}
      {!isFetching && items.length === 0 && (
        <p className={classes["empty__text"]}>No categories created.</p>
      )}
      {isFetching && (
        <div className={classes["spinner__container"]}>
          <CircularProgress size={25} />
        </div>
      )}
      <ModalEditCategory />
    </>
  );
};

export default SubjectView;
