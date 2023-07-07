import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { TextField, Button, CircularProgress } from "@mui/material";
import AuthFormWrapper from "../UI/AuthFormWrapper";
import classes from "./AuthForm.module.css";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

const initialLoginErrorObj = {
  message: " ",
  error: false,
};
const LogInForm = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loginError, setLoginError] = useState(initialLoginErrorObj);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const submitHandler = async () => {
    setLoadingSubmit(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result.ok) {
      setLoginError({ message: result.error, error: true });
      setLoadingSubmit(false);
      return;
    }

    router.replace("/");
  };
  return (
    <div className={classes["auth__box"]}>
      <AuthFormWrapper isLogin={true}>
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
          <h1 className={classes["auth__title"]}>Ingresar</h1>
        </div>
        <div>
          <TextField
            error={loginError.error}
            inputRef={emailRef}
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            error={loginError.error}
            inputRef={passwordRef}
            id="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="dense"
            type="password"
            helperText={loginError.message}
          />
        </div>
        <div className={classes["auth__buttons-box-between"]}>
          <Link href="/registrarse" className={classes["register__button"]}>
            <Button variant="text">Crear cuenta</Button>
          </Link>
          {loadingSubmit ? (
            <CircularProgress
              style={{ width: 34.75, height: 34.75, marginRight: 30 }}
            />
          ) : (
            <Button onClick={submitHandler} variant="contained">
              Ingresar
            </Button>
          )}
        </div>
        <Link className={classes["auth__home-button"]} href="/">
          <Button variant="outlined">INICIO</Button>
        </Link>
      </AuthFormWrapper>
    </div>
  );
};

export default LogInForm;
