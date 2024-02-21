import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ModalWrapper from "@/src/components/UI/modals/ModalWrapper";
import ModalCard from "@/src/components/UI/modals/ModalCard";
import { Button, CircularProgress, TextField } from "@mui/material";
import classes from "./ModalEditCategory.module.css";
import {
  useGetCategoryByCustomIdQuery,
  usePutUpdateCategoryMutation,
} from "@/src/features/api/categoryApiSlice";
import {
  useGetAllSubjectsQuery,
  useLazyGetSubjectByIdQuery,
} from "@/src/features/api/subjectsApiSlice";
import { useSelector } from "react-redux";

const ModalEditCategory = (props) => {
  const { name: subjectId } = useSelector(
    (state) => state.manager.selectedNodeId
  );
  const { push } = useRouter();
  const { query } = useRouter();
  const categoryId = query["edit-category"];

  const { data, isFetching } = useGetCategoryByCustomIdQuery(categoryId);
  const [updateCategory, { isLoading: updateCategoryIsLoading }] =
    usePutUpdateCategoryMutation();
  const { refetch: refetchAllSubjects } = useGetAllSubjectsQuery();
  const [fetchSubjectById] = useLazyGetSubjectByIdQuery();

  const [title, setTitle] = useState("");
  console.log(updateCategoryIsLoading);
  useEffect(() => {
    if (data?.isSuccess) {
      setTitle(data.category.title);
    }
  }, [data]);

  const submitHandler = async () => {
    const { data: resultData } = await updateCategory({
      customId: categoryId,
      body: { title },
    });
    if (resultData?.isSuccess) {
      refetchAllSubjects();
      fetchSubjectById(subjectId);
      push("/content-manager", undefined, { shallow: true });
    }
  };

  return (
    <ModalWrapper urlQuery="edit-category">
      <ModalCard>
        <div className={classes.container}>
          <h1 className={classes.title}>Edit Category</h1>
          {!isFetching && !updateCategoryIsLoading ? (
            <>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                type="text"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={classes["actions__container"]}>
                <Button
                  onClick={() => {
                    setTitle(data.category.title);
                    push("content-manager", undefined, { shallow: true });
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={submitHandler} variant="contained">
                  Save
                </Button>
              </div>
            </>
          ) : (
            <CircularProgress size={25} />
          )}
        </div>
      </ModalCard>
    </ModalWrapper>
  );
};

export default ModalEditCategory;
