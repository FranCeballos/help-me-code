import { useState, useRef } from "react";
import { Link } from "next/link";
import TitleForm from "../signup-steps/TitleForm";
import AuthFormWrapper from "@/components/UI/AuthFormWrapper";
import { TextField, Button, CircularProgress } from "@mui/material";
import classes from "../AuthForm.module.css";

const initialPasswordErrorsObj = {
  passwordError: false,
  passwordConfirmError: false,
  passwordConfirmMessage: " ",
};

const ResetPasswordForm = ({ userId, onSuccess, userEmail }) => {
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(
    initialPasswordErrorsObj
  );
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const passwordResetSubmitHandler = async () => {
    setLoading(true);
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    const response = await fetch("/api/auth/reset-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, userEmail, password, passwordConfirm }),
    });
    const data = await response.json();

    setPasswordErrors(data);
    setLoading(false);

    if (response.status === 201) {
      onSuccess();
    }
  };

  return (
    <div className={classes["auth__box-center"]}>
      <AuthFormWrapper isLogin={false}>
        <TitleForm
          title="Reiniciar Contraseña"
          description="Recupera tu cuenta"
        />
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
            <Button onClick={passwordResetSubmitHandler} variant="contained">
              Cambiar
            </Button>
          )}
        </div>
      </AuthFormWrapper>
    </div>
  );
};

export default ResetPasswordForm;
