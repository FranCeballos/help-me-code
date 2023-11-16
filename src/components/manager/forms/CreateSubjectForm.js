import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import classes from "./CreateSubjectForm.module.css";
import {
  useGetAllSubjectsQuery,
  usePostCreateSubjectMutation,
} from "@/src/features/api/subjectsApiSlice";
import { useRouter } from "next/router";

const CreateSubjectForm = (props) => {
  const nameRef = useRef(null);
  const selectRef = useRef(null);
  const { push } = useRouter();
  const { refetch } = useGetAllSubjectsQuery();
  const [createSubject, createSubjectResult] = usePostCreateSubjectMutation();
  const {
    isLoading: createSubjectIsLoading,
    isError,
    error,
  } = createSubjectResult;

  const submitHandler = async () => {
    const nameValue = nameRef.current.value;
    const selectValue = selectRef.current.value;

    if (nameValue && selectValue) {
      const { data } = await createSubject({
        title: nameValue,
        role: selectValue,
      });

      if (data?.isSuccess) {
        push("/content-manager");
        refetch();
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
      <p className={classes.title}>Create Subject</p>
      <TextField
        inputRef={nameRef}
        fullWidth
        placeholder="Subject name"
        label="Name"
      />
      <FormControl fullWidth>
        <InputLabel id="environment-select-label">Environment</InputLabel>
        <Select
          inputRef={selectRef}
          labelId="environment-select-label"
          id="environment-select"
          label="Environment"
          required
        >
          <MenuItem value="frontend">Front End</MenuItem>
          <MenuItem value="backend">Back End</MenuItem>
        </Select>
      </FormControl>
      {isError && (
        <p className={classes["error__text"]}>{error.data.message}</p>
      )}
      <div className={classes["buttons__container"]}>
        {createSubjectIsLoading ? (
          <div></div>
        ) : (
          <Link href="/content-manager">
            <Button>Cancel</Button>
          </Link>
        )}
        {createSubjectIsLoading ? (
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

export default CreateSubjectForm;
