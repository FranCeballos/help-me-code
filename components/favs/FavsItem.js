import Link from "next/link";
import classes from "./FavsItem.module.css";
import { motion } from "framer-motion";

const FavsItem = ({ favData }) => {
  console.log(favData);
  return (
    <Link href={`/series/${favData._id}`}>
      <motion.div
        className={classes["fav__container"]}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={favData.imageUrl}
          alt={favData.name}
          className={classes["fav__image"]}
        />
      </motion.div>
    </Link>
  );
};

export default FavsItem;
