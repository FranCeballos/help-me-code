import { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import { validateEmail } from "@/lib/client-input-validation";
import classes from "../AuthForm.module.css";

const EmailForm = ({ onNext }) => {
  const initialErrorObj = { status: false, message: " " };
  const [emailError, setEmailError] = useState(initialErrorObj);
  const emailRef = useRef();
  let emailHasValidationError = false;

  const emailSubmitHandler = () => {
    setEmailError(initialErrorObj);
    const email = emailRef.current.value.trim();
    const emailIsValid = validateEmail(email);
    console.log(emailIsValid);

    if (!emailIsValid) {
      emailHasValidationError = true;
      setEmailError({ status: true, message: "Ingresar email" });
    }

    onNext({ email }, emailHasValidationError);
  };

  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Email" description="Completa con tu email" />
      <div className={classes["auth__inputs-box"]}>
        <TextField
          inputRef={emailRef}
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="dense"
          error={emailError.status}
          helperText={emailError.status ? emailError.message : " "}
        />
      </div>
      <div className={classes["auth__buttons-box-end"]}>
        <Button onClick={emailSubmitHandler} variant="contained">
          Siguiente
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default EmailForm;
