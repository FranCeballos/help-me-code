import Link from "next/link";
import { TextField, Button, FormHelperText } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";
import { useState, useRef } from "react";

const NameForm = ({ onNext }) => {
  const [firstnameHasError, setFirstnameHasError] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const nameSubmitHandler = () => {
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim() || null;
    let hasValidationError = false;
    if (!firstName) {
      hasValidationError = true;
      setFirstnameHasError(true);
    }
    onNext({ firstName, lastName }, hasValidationError);
  };
  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Crea una cuenta C3+" description="Ingresa tu nombre" />
      <div className={classes["auth__inputs-box"]}>
        <TextField
          id="name"
          inputRef={firstNameRef}
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="dense"
          error={firstnameHasError}
          helperText={firstnameHasError ? "Ingresar nombre" : ""}
        />
        <TextField
          inputRef={lastNameRef}
          id="lastname"
          label="Apellido (opcional)"
          variant="outlined"
          fullWidth
          margin="dense"
        />
      </div>
      <div className={classes["auth__buttons-box-between"]}>
        <Link href="/ingresar" className={classes["register__button"]}>
          <Button variant="text">¿Ya tenés cuenta?</Button>
        </Link>
        <Button onClick={nameSubmitHandler} variant="contained">
          Siguiente
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default NameForm;
