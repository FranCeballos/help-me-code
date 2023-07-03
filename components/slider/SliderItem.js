import Link from "next/link";
import classes from "./SliderItem.module.css";
import { motion } from "framer-motion";

const RowItem = ({ seriesData }) => {
  console.log(seriesData);
  return (
    <Link
      className={classes["item__image-link"]}
      href={`/series/${seriesData._id}`}
    >
      <motion.img
        className={classes["item__image"]}
        src={seriesData.imageUrl}
        alt="Random image"
        whileHover={{ scale: 1.03 }}
      />
    </Link>
  );
};

export default RowItem;
