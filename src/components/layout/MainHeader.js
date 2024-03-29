import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  useFormControl,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession, signOut } from "next-auth/react";
import classes from "./MainHeader.module.css";
import Image from "next/image";

const barVariant = {
  rest: {
    originX: 0,
    scaleX: 0,
  },
  hover: {
    scaleX: 1,
  },
};

const nothing = {
  rest: {},
  hover: {},
};

const MainHeader = () => {
  const { data: session, status } = useSession();
  const [loadingAuth, setLoadingAuth] = useState(false);

  const logoutHandler = async () => {
    setLoadingAuth(true);
    const result = signOut({ redirect: false });

    if (!result.ok) {
      return;
    }
    setLoadingAuth(false);
    router.replace("/");
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes["nav__section"]}>
          <Link href="/" className={classes["logo__box"]}>
            <Image
              className={classes["logo"]}
              src="/logo-clear.png"
              alt="Help Me Code Logo"
              height={512}
              width={512}
            />
            <p className={classes["logo__text"]}>Help Me Code</p>
          </Link>
          <ul className={classes["nav__links"]}>
            <motion.li
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={nothing}
            >
              <Link className={classes["nav__link"]} href="/">
                <p>Home</p>
                <motion.div
                  className={classes["nav__link-bar"]}
                  variants={barVariant}
                ></motion.div>
              </Link>
            </motion.li>
            {session && (
              <motion.li
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={nothing}
              >
                <Link
                  className={classes["nav__link"]}
                  href="/my-list"
                  initial="rest"
                  whilehover="hover"
                  animate="rest"
                  variants={nothing}
                >
                  <p>My List</p>
                  <motion.div
                    className={classes["nav__link-bar"]}
                    variants={barVariant}
                  ></motion.div>
                </Link>
              </motion.li>
            )}
            {session && session.user.isAdmin && (
              <motion.li
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={nothing}
              >
                <Link
                  className={classes["nav__link"]}
                  href="/content-manager"
                  initial="rest"
                  whilehover="hover"
                  animate="rest"
                  variants={nothing}
                >
                  <p>Manager</p>
                  <motion.div
                    className={classes["nav__link-bar"]}
                    variants={barVariant}
                  ></motion.div>
                </Link>
              </motion.li>
            )}
          </ul>
        </div>
        <div>
          {/* {!isSearching && (
            <IconButton
              onClick={isSearchingHandler}
              aria-label="search"
              size="large"
              style={{ fontSize: 25, padding: 10 }}
            >
              <SearchIcon fontSize="inherit" />
            </IconButton>
          )} */}
          {/* {isSearching && (
            <FormControl
              sx={{ width: "25rem" }}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-seach">Search</InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="search icon" edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
                onBlur={notSearchingHandler}
                inputRef={searchInputRef}
              />
            </FormControl>
          )} */}
          {!session && status !== "loading" && (
            <Link href="/signin">
              <IconButton
                aria-label="login"
                size="large"
                style={{ fontSize: 25, padding: 10, marginLeft: 20 }}
              >
                <AccountCircleIcon fontSize="inherit" />
              </IconButton>
            </Link>
          )}
          {session &&
            (loadingAuth ? (
              <CircularProgress
                style={{
                  color: "#fff",
                  width: 30,
                  height: 30,
                  marginRight: 10,
                }}
              />
            ) : (
              <IconButton
                onClick={logoutHandler}
                aria-label="logout"
                size="large"
                style={{ fontSize: 25, padding: 10, marginLeft: 20 }}
              >
                <LogoutIcon fontSize="inherit" />
              </IconButton>
            ))}
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
