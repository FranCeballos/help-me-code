import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  progressBar20,
  progressBar40,
  progressBar60,
  progressBar80,
  progressBar100,
} from "@/src/animations/progress-bar";
import { createUser } from "@/src/lib/auth";
import NameForm from "./signup-steps/NameForm";
import BirthForm from "./signup-steps/BirthForm";
import EmailForm from "./signup-steps/EmailForm";
import PasswordForm from "./signup-steps/PasswordForm";
import SuccessForm from "./signup-steps/SuccesForm";
import classes from "./AuthForm.module.css";

const SignUpForm = () => {
  const [formView, setFormView] = useState("name");
  const [signupInfo, setSignupInfo] = useState({});

  const nameSubmitHandler = (data, hasError) => {
    if (hasError) return;

    setSignupInfo({ firstName: data.firstName, lastName: data.lastName });
    setFormView("birth");
  };

  const birthSubmitHandler = (data, hasError) => {
    if (hasError) return;

    setSignupInfo((prevInfo) => {
      return { ...prevInfo, birthDate: data.date, gender: data.gender };
    });
    setFormView("email");
  };

  const emailSubmitHandler = (data, hasError) => {
    if (hasError) return;

    setSignupInfo((prevInfo) => {
      return { ...prevInfo, email: data.email };
    });
    setFormView("password");
  };

  const passwordSubmitHandler = async (data, hasPasswordError) => {
    const { password } = data;
    const { passwordError, passwordConfirmError } = hasPasswordError;

    let newSignupInfo = {};
    setSignupInfo((prevInfo) => {
      const signupData = {
        ...prevInfo,
        password,
      };
      newSignupInfo = signupData;
      return signupData;
    });

    if (passwordError || passwordConfirmError) {
      return { error: true };
    }

    const createUserResponse = await createUser(newSignupInfo);

    if (!createUserResponse.serverError) {
      setFormView("success");
      setSignupInfo({});
      return { error: false };
    }

    return { error: true, message: createUserResponse.message };
  };

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
    case "success":
      formViewComponent = <SuccessForm />;
      progressBarLevel = progressBar100;
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
          transition={{ type: "spring", duration: 0.5 }}
        />
        {formViewComponent}
      </div>
    </AnimatePresence>
  );
};

export default SignUpForm;
