import Link from "next/link";
import { Button } from "@mui/material";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";

const SuccessForm = () => {
  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm title="Account created successfully" description="" />
      <div className={classes["auth__buttons-box-center"]}>
        <Link className={classes["register__button"]} href="/signin">
          <Button variant="contained">Sign In</Button>
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

export default SuccessForm;
