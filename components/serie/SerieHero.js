import { IconButton, Button, Fab } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import classes from "./Serie.module.css";

const SerieHero = (props) => {
  const serieData = props.serieData;
  return (
    <div className={classes["serie__image-box"]}>
      <div className={classes["serie__image-buttons"]}>
        <h1 className={classes["serie__title"]}>{serieData.name}</h1>
        <div>
          <Fab
            style={{
              fontSize: 14,
              fontWeight: 700,
              backgroundColor: "white",
            }}
            variant="extended"
          >
            <PlayArrowIcon style={{ fontSize: 23, marginRight: 6 }} />
            Reproducir
          </Fab>
          <IconButton
            aria-label="add-favorites"
            size="large"
            style={{
              fontSize: 60,
              padding: 10,
              marginLeft: 20,
            }}
          >
            <AddCircleIcon style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </div>
      <img src={serieData.imageUrl} className={classes["serie__image"]} />
    </div>
  );
};

export default SerieHero;
