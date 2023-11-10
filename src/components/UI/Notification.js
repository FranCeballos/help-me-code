import { Alert } from "@mui/material";
import classes from "./Notification.module.css";

const Notification = ({
  message = "Notificación sin contenido",
  state = "info",
}) => {
  return (
    <div className={classes["not__container"]}>
      {/* {state === "loading" && } */}
      <Alert severity={state} style={{ fontSize: 15 }}>
        {message}
      </Alert>
    </div>
  );
};

export default Notification;
