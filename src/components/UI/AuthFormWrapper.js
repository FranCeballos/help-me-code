import classes from "./AuthFormWrapper.module.css";

const AuthFormWrapper = ({ children, isLogin }) => {
  const variant = isLogin ? "login__wrapper" : "signup__wrapper";

  return <div className={classes[variant]}>{children}</div>;
};

export default AuthFormWrapper;
