import Link from "next/link";
import { TextField, Button } from "@mui/material";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";
import Image from "next/image";

const NameForm = ({ onNext }) => {
  return (
    <AuthFormWrapper isLogin={false}>
      <div className={classes["auth__title-box"]}>
        <div className={classes["auth__image-box"]}>
          <Image
            className={classes["auth__image"]}
            src="/logo-clear-white.png"
            width={200}
            height={200}
            alt="C3 Logo"
          />
        </div>
        <h1 className={classes["auth__title"]}>Crea una cuenta C3+</h1>
        <h2 className={classes["auth__sub-title"]}>Ingresa tu nombre</h2>
      </div>
      <div>
        <TextField
          id="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="dense"
        />
        <TextField
          id="lastname"
          label="Apellido (opcional)"
          variant="outlined"
          fullWidth
          margin="dense"
        />
      </div>
      <div className={classes["auth__buttons-box-end"]}>
        <Link href="/ingresar" className={classes["register__button"]}>
          <Button variant="text">¿Ya tenés cuenta?</Button>
        </Link>
        <Button onClick={onNext("birth")} variant="contained">
          Siguiente
        </Button>
      </div>
      {/* <Link className={classes["auth__home-button"]} href="/">
        <Button variant="outlined">INICIO</Button>
      </Link> */}
    </AuthFormWrapper>
  );
};

export default NameForm;
