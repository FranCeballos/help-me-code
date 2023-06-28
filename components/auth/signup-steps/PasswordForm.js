import { TextField, Button } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import {
  validatePassword,
  matchPasswords,
} from "@/lib/client-input-validation";
import classes from "../AuthForm.module.css";
import { useState, useRef } from "react";

const PasswordForm = ({ onNext }) => {
  const initialValidationObj = { status: false, message: "" };
  const [passwordError, setPasswordError] = useState(initialValidationObj);
  const [passwordConfirmError, setPasswordConfirmError] =
    useState(initialValidationObj);
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  let passwordHasError = false;

  const passwordSubmitHandler = () => {
    setPasswordError(false);
    setPasswordConfirmError(false);
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    const passwordIsValid = validatePassword(password);
    const passwordsMatch = matchPasswords(password, passwordConfirm);
    console.log("PasswordIsValid:", passwordIsValid);
    console.log("PasswordsMatch:", passwordsMatch);

    if (!passwordIsValid) {
      passwordHasError = true;
      setPasswordError({ status: true, message: null });
    }

    if (!passwordsMatch) {
      passwordHasError = true;
      setPasswordConfirmError({
        status: true,
        message: "Las contraseñas no coinciden",
      });
    }

    onNext({ password }, passwordHasError);
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
          margin="dense"
          error={passwordError.status}
          helperText={
            "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
          }
        />
        <TextField
          inputRef={passwordConfirmRef}
          id="passwordConfirm"
          label="Confirmar contraseña"
          variant="outlined"
          fullWidth
          margin="dense"
          error={passwordConfirmError.status}
          helperText={passwordConfirmError.message}
        />
      </div>
      <div className={classes["auth__buttons-box-end"]}>
        <Button onClick={passwordSubmitHandler} variant="contained">
          Siguiente
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default PasswordForm;
