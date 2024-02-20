import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import CreateSubjectForm from "./forms/CreateSubjectForm";
import classes from "./ActionButtons.module.css";
import CreateCategoryForm from "./forms/CreateCategoryForm";

const ActionButtons = (props) => {
  const {
    query: { create },
    push,
  } = useRouter();
  const forms = {
    undefined: null,
    subject: <CreateSubjectForm />,
    category: <CreateCategoryForm />,
  };
  return (
    <motion.div key="buttons" className={classes.container}>
      <div className={classes["buttons__container"]}>
        <Button
          variant="outlined"
          onClick={() =>
            push("/content-manager?create=subject", undefined, {
              shallow: true,
            })
          }
        >
          Create subject
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            push("/content-manager?create=category", undefined, {
              shallow: true,
            })
          }
        >
          Create category
        </Button>
      </div>
      {forms[create]}
    </motion.div>
  );
};

export default ActionButtons;
