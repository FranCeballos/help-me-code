import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  useFormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const [isSearching, setIsSearching] = useState(false);
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
          <Link href="/ingresar">
            <IconButton
              aria-label="login"
              size="large"
              style={{ fontSize: 25, padding: 10, marginLeft: 20 }}
            >
              <LoginIcon fontSize="inherit" />
            </IconButton>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
