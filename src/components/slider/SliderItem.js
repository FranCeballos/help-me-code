import Link from "next/link";
import classes from "./SliderItem.module.css";
import { motion } from "framer-motion";

const RowItem = ({ data }) => {
  return (
    <Link className={classes["item__image-link"]} href={`/series/${data._id}`}>
      <motion.img
        className={classes["item__image"]}
        src={data.imageUrl}
        alt={data.name}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
};

export default RowItem;
