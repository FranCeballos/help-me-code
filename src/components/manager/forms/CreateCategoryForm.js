import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  useGetAllSubjectsQuery,
  useLazyGetSubjectByIdQuery,
  usePostCreateSubjectMutation,
} from "@/src/features/api/subjectsApiSlice";
import classes from "./CreateForm.module.css";
import { usePostCreateCategoryMutation } from "@/src/features/api/categoryApiSlice";
import { useSelector } from "react-redux";

const CreateCategoryForm = (props) => {
  const { name: subjectId } = useSelector(
    (state) => state.manager.selectedNodeId
  );
  const nameRef = useRef(null);
  const selectRef = useRef(null);
  const { push } = useRouter();
  const [fetchSubjectById] = useLazyGetSubjectByIdQuery();
  const {
    data: subjectsData,
    isLoading: subjectsAreLoading,
    refetch,
  } = useGetAllSubjectsQuery();

  const [createCategory, createCategoryResult] =
    usePostCreateCategoryMutation();
  const {
    isLoading: createCategoryIsLoading,
    isError,
    error,
  } = createCategoryResult;

  const submitHandler = async () => {
    const nameValue = nameRef.current.value;
    const selectValue = selectRef.current.value;

    if (nameValue && selectValue) {
      const { data } = await createCategory({
        title: nameValue,
        subject: selectValue,
      });

      if (data?.isSuccess) {
        push("/content-manager");
        refetch();
        fetchSubjectById(subjectId);
      }
    }
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className={classes.container}
    >
      <p className={classes.title}>Create Category</p>
      <TextField
        inputRef={nameRef}
        fullWidth
        placeholder="Category name"
        label="Category name"
      />
      <FormControl fullWidth>
        <InputLabel id="subject-select-label">Subject</InputLabel>
        <Select
          inputRef={selectRef}
          labelId="subject-select-label"
          id="subject-select"
          label="Subject"
          required
        >
          {!subjectsAreLoading
            ? subjectsData.subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject.customId}>
                  {subject.title}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
      {isError && (
        <p className={classes["error__text"]}>{error.data.message}</p>
      )}
      <div className={classes["buttons__container"]}>
        {createCategoryIsLoading ? (
          <div></div>
        ) : (
          <Link href="/content-manager">
            <Button>Cancel</Button>
          </Link>
        )}
        {createCategoryIsLoading ? (
          <CircularProgress size={30} />
        ) : (
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default CreateCategoryForm;
