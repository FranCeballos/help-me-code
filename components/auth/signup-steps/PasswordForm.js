import { TextField, Button, CircularProgress } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";
import { useEffect, useRef, useState } from "react";
import { validatePasswordWithServer } from "@/lib/auth";

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
    onNext({ password }, result);
  };

  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Contraseña" description="Añade seguridad" />
      <div className={classes["auth__inputs-box"]}>
        <TextField
          inputRef={passwordRef}
          id="password"
          label="Nueva contraseña"
          variant="outlined"
          fullWidth
          type="password"
          margin="dense"
          error={passwordErrors.passwordError}
          helperText={
            "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
          }
        />
        <TextField
          inputRef={passwordConfirmRef}
          id="passwordConfirm"
          label="Confirmar contraseña"
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
            Siguiente
          </Button>
        )}
      </div>
    </AuthFormWrapper>
  );
};

export default PasswordForm;
