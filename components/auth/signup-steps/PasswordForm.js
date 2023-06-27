import Link from "next/link";
import { TextField, Button } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";

const PasswordForm = ({ onNext }) => {
  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Contraseña" description="Añade seguridad" />
      <div className={classes["auth__inputs-box"]}>
        <TextField
          id="password"
          label="Nueva contraseña"
          variant="outlined"
          fullWidth
          margin="dense"
        />
        <TextField
          id="passwordConfirm"
          label="Confirmar contraseña"
          variant="outlined"
          fullWidth
          margin="dense"
        />
      </div>
      <div className={classes["auth__buttons-box-end"]}>
        <Button onClick={onNext.bind(null, "password")} variant="contained">
          Siguiente
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default PasswordForm;
