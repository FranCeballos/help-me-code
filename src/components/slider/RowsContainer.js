import Slider from "./Slider";
import classes from "./RowsContainer.module.css";

const RowsContainer = ({ data }) => {
  return (
    <div className={classes["rows__container"]}>
      <Slider title="Content" data={data} />
    </div>
  );
};

export default RowsContainer;
