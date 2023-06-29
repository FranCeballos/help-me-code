import Slider from "./Slider";

import classes from "./RowsContainer.module.css";

const RowsContainer = () => {
  return (
    <div className={classes["rows__container"]}>
      <Slider />
    </div>
  );
};

export default RowsContainer;
