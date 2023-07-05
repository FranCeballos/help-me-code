import FavsItem from "./FavsItem";
import classes from "./FavsGrid.module.css";

const FavsGrid = (props) => {
  const userFavs = props.userFavs;
  console.log(userFavs);
  return (
    <div className={classes["favs__grid"]}>
      {userFavs.map((fav) => (
        <FavsItem favData={fav} />
      ))}
    </div>
  );
};

export default FavsGrid;
