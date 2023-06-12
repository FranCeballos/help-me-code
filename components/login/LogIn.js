import LogInForms from "./LogInForm";
import classes from "./LogIn.module.css";

const LogIn = () => {
  return (
    <div className={classes["grid__two-columns"]}>
      {/* <div className={classes["pic-box"]}>
        <img
          className={classes.pic}
          src="/login/login.jpg"
          alt="Log In Picture"
        />
      </div> */}
      <div className={classes["pic-box"]}>
        <video className={classes["video"]} autoPlay muted loop>
          <source src="/login/login1.mp4" type="video/mp4" />
        </video>
      </div>
      <LogInForms />
    </div>
  );
};

export default LogIn;
