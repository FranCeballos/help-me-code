import TreeViewContainer from "./TreeViewContainer";
import classes from "./ManagerContainer.module.css";
const ManagerContainer = ({ subjects }) => {
  return (
    <div className={classes.container}>
      <h1 className="main-clip-text">Content Manager</h1>
      <div className={classes["content__container"]}>
        <TreeViewContainer subjects={subjects} />
      </div>
    </div>
  );
};

export default ManagerContainer;
