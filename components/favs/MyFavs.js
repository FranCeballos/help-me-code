import FavsGrid from "./FavsGrid";
import { Button } from "@mui/material";
import classes from "./MyFavs.module.css";
import Link from "next/link";
const MyFavs = (props) => {
  const userFavs = props.userFavs;
  const favsIsEmpty = userFavs.length === 0;
  return (
    <div className={classes["favs__container"]}>
      <h1 className="main-clip-text">My List</h1>
      {!favsIsEmpty ? (
        <FavsGrid userFavs={userFavs} />
      ) : (
        <div className={classes["favs__empty-box"]}>
          <p className={classes["favs__text"]}>You don't have saved favs.</p>
          <Link href="/" className="link__style-off">
            <Button variant="contained">Navigate</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyFavs;
