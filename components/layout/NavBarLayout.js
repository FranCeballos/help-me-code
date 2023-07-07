import { useContext } from "react";
import NotificationContext from "@/store/notification-context";
import NavBar from "./MainHeader";
import Notification from "../UI/Notification";
import classes from "./NavBarLayout.module.css";

const NavBarLayout = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <>
      <NavBar />
      <main className={classes.main}>{props.children}</main>
      {activeNotification && (
        <Notification
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default NavBarLayout;
