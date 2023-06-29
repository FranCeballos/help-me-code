import Link from "next/link";
import { Button } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";

const SuccessForm = () => {
  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Cuenta creada con exito" description="" />
      <div className={classes["auth__buttons-box-center"]}>
        <Link className={classes["register__button"]} href="/ingresar">
          <Button variant="contained">Ingresar</Button>
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

export default SuccessForm;
