import NameForm from "./signup-steps/NameForm";
import classes from "./AuthForm.module.css";
import { useState } from "react";

const SignUpForm = ({ onChangeHandler }) => {
  const [formView, setFormView] = useState("name");

  const changeFormView = (view) => {
    setFormView(view);
  };

  return (
    <div className={classes["auth__box-center"]}>
      <NameForm onNext={changeFormView} />
    </div>
  );
};

export default SignUpForm;
