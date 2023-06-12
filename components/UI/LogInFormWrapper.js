import classes from "./LogInFormWrapper.module.css";

const LogInFormWrapper = ({ children }) => {
  return <div className={classes["login__wrapper"]}>{children}</div>;
};

export default LogInFormWrapper;
