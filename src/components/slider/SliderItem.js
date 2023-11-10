import Link from "next/link";
import classes from "./SliderItem.module.css";
import { motion } from "framer-motion";

const RowItem = ({ seriesData }) => {
  return (
    <Link
      className={classes["item__image-link"]}
      href={`/series/${seriesData._id}`}
    >
      <motion.img
        className={classes["item__image"]}
        src={seriesData.imageUrl}
        alt={seriesData.name}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
};

export default RowItem;