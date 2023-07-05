import FavsGrid from "./FavsGrid";
import { Button } from "@mui/material";
import classes from "./MyFavs.module.css";
import Link from "next/link";
const MyFavs = (props) => {
  const userFavs = props.userFavs;
  const favsEmpty = userFavs.length === 0;
  return (
    <div className={classes["favs__container"]}>
      <h1 className="main-clip-text">Mi Lista</h1>
      {!favsEmpty ? (
        <FavsGrid userFavs={userFavs} />
      ) : (
        <div className={classes["favs__empty-box"]}>
          <p className={classes["favs__text"]}>No hay series añadidas.</p>
          <Link href="/" className="link__style-off">
            <Button variant="contained">Navegá</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyFavs;
