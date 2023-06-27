import Image from "next/image";
import classes from "../AuthForm.module.css";
const TitleForm = ({ title, description }) => {
  return (
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
      <h1 className={classes["auth__title"]}>{title}</h1>
      <h2 className={classes["auth__sub-title"]}>{description}</h2>
    </div>
  );
};

export default TitleForm;
