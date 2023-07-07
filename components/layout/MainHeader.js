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
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession, signOut } from "next-auth/react";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const { data: session, status } = useSession();
  const [isSearching, setIsSearching] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const searchInputRef = useRef();

  useEffect(() => {
    isSearching && searchInputRef.current.focus();
  }, [isSearching]);

  const isSearchingHandler = () => {
    setIsSearching(true);
  };

  const notSearchingHandler = () => {
    setIsSearching(false);
  };

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
            <img
              className={classes["logo"]}
              src="/logo-clear-white.png"
              alt="C3+ Logo"
            />
          </Link>
          <ul className={classes["nav__links"]}>
            <li>
              <Link className={classes["nav__link"]} href="/">
                Inicio
              </Link>
            </li>
            {session && (
              <li>
                <Link className={classes["nav__link"]} href="/mi-lista">
                  Mi Lista
                </Link>
              </li>
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
            <Link href="/ingresar">
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
