import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  progressBar20,
  progressBar40,
  progressBar60,
  progressBar80,
  progressBar100,
} from "@/animations/progress-bar";
import NameForm from "./signup-steps/NameForm";
import BirthForm from "./signup-steps/BirthForm";
import EmailForm from "./signup-steps/EmailForm";
import PasswordForm from "./signup-steps/PasswordForm";
import classes from "./AuthForm.module.css";

const SignUpForm = () => {
  const [formView, setFormView] = useState("name");
  const [signupInfo, setSignupInfo] = useState({});

  const changeFormView = (view) => {
    setFormView(view);
  };

  console.log(signupInfo);

  const nameSubmitHandler = (data, hasError) => {
    if (hasError) return;

    setSignupInfo({ firstName: data.firstName, lastName: data.lastName });
    changeFormView("birth");
  };

  const birthSubmitHandler = (data, hasError) => {
    if (hasError) return;

    setSignupInfo((prevInfo) => {
      return { ...prevInfo, birthDate: data.date, gender: data.gender };
    });
    changeFormView("email");
  };

  const emailSubmitHandler = (data, hasError) => {
    if (hasError) return;

    setSignupInfo((prevInfo) => {
      return { ...prevInfo, email: data.email };
    });
    changeFormView("password");
  };

  const passwordSubmitHandler = () => {};

  const finalSubmitHandler = () => {};

  let formViewComponent = <NameForm onNext={nameSubmitHandler} />;
  let progressBarLevel = progressBar20;

  switch (formView) {
    case "birth":
      formViewComponent = <BirthForm onNext={birthSubmitHandler} />;
      progressBarLevel = progressBar40;
      break;
    case "email":
      formViewComponent = <EmailForm onNext={emailSubmitHandler} />;
      progressBarLevel = progressBar60;
      break;
    case "password":
      formViewComponent = <PasswordForm onNext={passwordSubmitHandler} />;
      progressBarLevel = progressBar80;
      break;
    case "default":
      formViewComponent = <NameForm onNext={changeFormView} />;
      progressBarLevel = progressBar20;
      break;
  }

  return (
    <AnimatePresence>
      <div className={classes["auth__box-center"]}>
        <motion.div
          className={classes["progress-bar"]}
          variants={progressBarLevel}
          initial={"initial"}
          animate={"animate"}
          transition={{ duration: 0.3 }}
        />
        {formViewComponent}
      </div>
    </AnimatePresence>
  );
};

export default SignUpForm;
