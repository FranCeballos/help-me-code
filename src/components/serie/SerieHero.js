import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IconButton, Fab, Popover, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./Serie.module.css";
import Link from "next/link";
import {
  useLazyGetUserFavsQuery,
  useToggleFavMutation,
} from "@/src/features/api/favsApiSlice";

const SerieHero = (props) => {
  const serieData = props.serieData;
  const { _id: serieId } = serieData;
  const { data: session } = useSession();

  const [
    fetchFavs,
    {
      data: fetchFavsData,
      isLoading: fetchFavsIsLoading,
      isFetching: fetchFavsIsFetching,
    },
  ] = useLazyGetUserFavsQuery();
  const [toggleFavs, { isLoading: toggleFavsIsLoading }] =
    useToggleFavMutation();

  const favsData = fetchFavsData?.allFavs || [];
  const serieIsInFavs = favsData.includes(serieId);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (session) {
      fetchFavs();
    }
  }, [session]);

  const handleToggleFav = async () => {
    setAnchorEl(null);
    const response = await toggleFavs({ serieId, serieIsInFavs });
    fetchFavs();
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
    (fetchFavsIsLoading || fetchFavsIsFetching || toggleFavsIsLoading ? (
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
          onClick={handleToggleFav}
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
          onClick={handleToggleFav}
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
