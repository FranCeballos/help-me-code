import LogInForm from "./LogInForm";
import classes from "./LogIn.module.css";

const LogIn = () => {
  return (
    <div className={classes["grid__two"]}>
      <div className={classes["pic-box"]}>
        <video className={classes["video"]} autoPlay muted loop playsInline>
          <source src="/login/login1.mp4" type="video/mp4" />
        </video>
      </div>
      <LogInForm />
    </div>
  );
};

export default LogIn;
