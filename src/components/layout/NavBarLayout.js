import { useContext } from "react";
import NavBar from "./MainHeader";
import classes from "./NavBarLayout.module.css";

const NavBarLayout = (props) => {
  return (
    <>
      <NavBar />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default NavBarLayout;
