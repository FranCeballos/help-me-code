import Link from "next/link";
import { Fab } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import classes from "./EpisodeNavigation.module.css";

const EpisodeNavigation = ({ serieData, episodeNum }) => {
  const isFirstEpisode = episodeNum === 1;
  const isLastEpisode = episodeNum === serieData.numOfEpisodes;
  const prevEpisode = episodeNum - 1;
  const nextEpisode = episodeNum + 1;

  return (
    <div className={classes["navigation__container"]}>
      {!isFirstEpisode ? (
        <Link
          href={`/series/${serieData._id}/${prevEpisode}`}
          className="link__style-off"
        >
          <Fab
            style={{
              fontSize: 14,
              fontWeight: 600,
              background: "#fff",
              paddingRight: 20,
              color: "black",
            }}
            variant="extended"
          >
            <NavigateBeforeIcon style={{ fontSize: 20, marginRight: 6 }} />
            Anterior
          </Fab>
        </Link>
      ) : (
        <div></div>
      )}
      {!isLastEpisode ? (
        <Link
          href={`/series/${serieData._id}/${nextEpisode}`}
          className="link__style-off"
        >
          <Fab
            style={{
              fontSize: 14,
              fontWeight: 600,
              background: "#fff",
              paddingLeft: 20,
              color: "black",
            }}
            variant="extended"
          >
            Siguiente
            <NavigateNextIcon style={{ fontSize: 20, marginLeft: 6 }} />
          </Fab>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EpisodeNavigation;
