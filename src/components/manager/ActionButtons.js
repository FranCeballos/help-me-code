import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import CreateSubjectForm from "./forms/CreateSubjectForm";
import classes from "./ActionButtons.module.css";

const ActionButtons = (props) => {
  const {
    query: { create },
  } = useRouter();
  const forms = {
    undefined: null,
    subject: <CreateSubjectForm />,
  };
  return (
    <motion.div key="buttons" className={classes.container}>
      <div className={classes["buttons__container"]}>
        <Link href="/content-manager?create=subject">
          <Button variant="outlined">Create subject</Button>
        </Link>
        <Link href="/content-manager?create=category">
          <Button variant="outlined">Create category</Button>
        </Link>
      </div>
      {forms[create]}
    </motion.div>
  );
};

export default ActionButtons;
