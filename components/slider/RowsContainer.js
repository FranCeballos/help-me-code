import Slider from "./Slider";
import classes from "./RowsContainer.module.css";

const RowsContainer = (props) => {
  const allSeries = props.seriesData;
  console.log("RowsContainer", allSeries);
  const categories = {
    acerca: {
      title: "Acerca",
      query: "acerca",
    },
    crecimiento: {
      title: "Crecimiento",
      query: "crecimiento",
    },
    cienciayfe: {
      title: "Ciencias y Fe",
      query: "cienciayfe",
    },
  };
  const filterSeries = (series, query) => {
    return series.filter((serie) => serie.category === query);
  };

  const aboutSeries = filterSeries(allSeries, categories.acerca.query);
  const growthSeries = filterSeries(allSeries, categories.crecimiento.query);
  const scienceFaithSeries = filterSeries(
    allSeries,
    categories.cienciayfe.query
  );
  return (
    <div className={classes["rows__container"]}>
      <Slider title="Acerca" seriesData={aboutSeries} />
      {/* <Slider title="Crecimiento" seriesData={growthSeries} />
      <Slider title="Ciencia y Fe" seriesData={scienceFaithSeries} /> */}
    </div>
  );
};

export default RowsContainer;
