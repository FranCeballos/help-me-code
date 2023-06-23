import Row from "./Slider";

import classes from "./RowsContainer.module.css";

const RowsContainer = () => {
  return (
    <div className={classes["rows__container"]}>
      <Row />
    </div>
  );
};

export default RowsContainer;
