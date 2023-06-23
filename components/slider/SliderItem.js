import Link from "next/link";
import { motion } from "framer-motion";
import classes from "./SliderItem.module.css";

const RowItem = ({ imageUrl }) => {
  return (
    <Link className={classes["item__image-link"]} href={`/series/${imageUrl}`}>
      <motion.img
        className={classes["item__image"]}
        src={imageUrl}
        alt="Random image"
        whileHover={{}}
      />
    </Link>
  );
};

export default RowItem;
