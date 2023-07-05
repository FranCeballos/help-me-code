import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IconButton, Button, Fab, Popover, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./Serie.module.css";
import Link from "next/link";

const SerieHero = (props) => {
  const { data: session, status } = useSession();
  console.log(session);
  const serieData = props.serieData;
  const [favsData, setFavsData] = useState([]);
  const [favIsLoading, setFavIsLoading] = useState(true);
  const serieIsInFavs = favsData?.includes(serieData._id);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const getFavs = async () => {
      const response = await fetch("/api/favs");
      const data = await response.json();
      return data;
    };
    getFavs().then((data) => {
      setFavsData(data.allFavs);
      setFavIsLoading(false);
    });
  }, []);

  const addFavHandler = async () => {
    setAnchorEl(null);
    setFavIsLoading(true);
    const response = await fetch("/api/favs", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serieId: serieData._id,
        addFav: true,
      }),
    });
    if (response.status === 201) {
      setFavsData((prev) => {
        return [...prev, serieData._id];
      });
    }
    setFavIsLoading(false);
  };

  const deleteFavHandler = async () => {
    setAnchorEl(null);
    setFavIsLoading(true);
    const response = await fetch("/api/favs", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serieId: serieData._id,
        addFav: false,
      }),
    });
    if (response.status === 200) {
      setFavsData((prev) => {
        return prev.filter((fav) => fav !== serieData._id);
      });
    }
    setFavIsLoading(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const popover = (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: "none",
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1 }}>
        {serieIsInFavs ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
      </Typography>
    </Popover>
  );

  const favState =
    session &&
    (favIsLoading ? (
      <CircularProgress size={50} style={{ color: "#fff", padding: 10 }} />
    ) : serieIsInFavs ? (
      <>
        <IconButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          aria-label="add-favorites"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          style={{
            width: "50px",
            height: "50px",
          }}
          onClick={deleteFavHandler}
        >
          <CheckCircleIcon style={{ width: "40px", height: "40px" }} />
        </IconButton>
        {popover}
      </>
    ) : (
      <>
        <IconButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          aria-label="add-favorites"
          style={{
            width: "50px",
            height: "50px",
          }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={addFavHandler}
        >
          <AddCircleIcon style={{ width: "40px", height: "40px" }} />
        </IconButton>
        {popover}
      </>
    ));

  return (
    <div className={classes["serie__image-box"]}>
      <div className={classes["serie__image-buttons"]}>
        <h1 className={classes["serie__title"]}>{serieData.name}</h1>
        <div className={classes["serie__buttons-box"]}>
          <Link href={`/series/${serieData._id}/1`} className="link__style-off">
            <Fab
              style={{
                fontSize: 14,
                fontWeight: 700,
                backgroundColor: "white",
              }}
              variant="extended"
            >
              <PlayArrowIcon
                style={{
                  fontSize: 23,
                  marginRight: 6,
                }}
              />
              Reproducir
            </Fab>
          </Link>
          {favState}
        </div>
      </div>
      <img src={serieData.imageUrl} className={classes["serie__image"]} />
    </div>
  );
};

export default SerieHero;
