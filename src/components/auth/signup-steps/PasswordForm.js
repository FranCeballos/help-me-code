import { TextField, Button, CircularProgress } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";
import { useEffect, useRef, useState } from "react";
import { validatePasswordWithServer } from "@/src/lib/auth";

const initialPasswordErrorsObj = {
  passwordError: false,
  passwordConfirmError: false,
  passwordConfirmMessage: " ",
};

const PasswordForm = ({ onNext }) => {
  const [passwordErrors, setPasswordErrors] = useState(
    initialPasswordErrorsObj
  );
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const passwordSubmitHandler = async () => {
    setLoading(true);
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    const result = await validatePasswordWithServer(password, passwordConfirm);
    if (result.passwordError || result.passwordConfirmError) {
      setLoading(false);
      setPasswordErrors(result);
    }
    const response = await onNext({ password }, result);
    if (response.error) {
      setLoading(false);
    }
  };

  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Password" description="Add security" />
      <div className={classes["auth__inputs-box"]}>
        <TextField
          inputRef={passwordRef}
          id="password"
          label="New password"
          variant="outlined"
          fullWidth
          type="password"
          margin="dense"
          error={passwordErrors.passwordError}
          helperText={
            "Must have at least 8 characters, one lowercase, one uppercase and a number."
          }
        />
        <TextField
          inputRef={passwordConfirmRef}
          id="passwordConfirm"
          label="Confirm password"
          variant="outlined"
          type="password"
          fullWidth
          margin="dense"
          error={passwordErrors.passwordConfirmError}
          helperText={passwordErrors.passwordConfirmMessage}
        />
      </div>
      <div className={classes["auth__buttons-box-end"]}>
        {loading ? (
          <CircularProgress
            style={{ width: 34.75, height: 34.75, marginRight: 30 }}
          />
        ) : (
          <Button onClick={passwordSubmitHandler} variant="contained">
            Finish
          </Button>
        )}
      </div>
    </AuthFormWrapper>
  );
};

export default PasswordForm;
