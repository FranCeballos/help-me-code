import { useState, useRef } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";
import { validateEmailWithServer } from "@/src/lib/auth";

const EmailForm = ({ onNext }) => {
  const initialErrorObj = { status: false, message: " " };
  const [emailError, setEmailError] = useState(initialErrorObj);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  const emailSubmitHandler = async () => {
    setLoading(true);
    const email = emailRef.current.value.trim().toLowerCase();

    const response = await validateEmailWithServer(email);

    const { emailIsValid, message } = response;
    const emailHasError = !emailIsValid;
    if (emailHasError) {
      setLoading(false);
      setEmailError({ status: emailHasError, message: message });
    }
    onNext({ email }, emailHasError);
  };

  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Email" description="Complete with your email" />
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
        {loading ? (
          <CircularProgress
            style={{ width: 34.75, height: 34.75, marginRight: 30 }}
          />
        ) : (
          <Button onClick={emailSubmitHandler} variant="contained">
            Siguiente
          </Button>
        )}
      </div>
    </AuthFormWrapper>
  );
};

export default EmailForm;
