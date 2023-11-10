import SerieHero from "./SerieHero";
import SerieContent from "./SerieContent";
import classes from "./Serie.module.css";

const Serie = (props) => {
  const serieData = props.serieData;
  return (
    <div className={classes["serie__card"]}>
      <SerieHero serieData={serieData} />
      <SerieContent serieData={serieData} />
    </div>
  );
};

export default Serie;
