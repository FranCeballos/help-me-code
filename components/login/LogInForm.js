import Link from "next/link";
import { TextField, Button, IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";
import LogInFormWrapper from "../UI/LogInFormWrapper";
import classes from "./LogInForm.module.css";

const LogInForm = () => {
  return (
    <div className={classes["login__box"]}>
      <LogInFormWrapper>
        <div className={classes["login__title-box"]}>
          <h1 className={classes["login__title"]}>Ingresa</h1>
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="dense"
          />
        </div>
        <div className={classes["login__buttons-box-end"]}>
          <Link href="/signup">
            <Button variant="text">Crear cuenta</Button>
          </Link>
          <Button variant="contained">Ingresar</Button>
        </div>
        <Link className={classes["login__home-button"]} href="/">
          <Button variant="outlined">INICIO</Button>
        </Link>
      </LogInFormWrapper>
    </div>
  );
};

export default LogInForm;
