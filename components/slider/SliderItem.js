import Link from "next/link";
import { motion } from "framer-motion";
import classes from "./SliderItem.module.css";

const RowItem = ({ data }) => {
  return (
    <Link className={classes["item__image-link"]} href={`/series/${data._id}`}>
      <motion.img
        className={classes["item__image"]}
        src={data.imageUrl}
        alt="Random image"
        whileHover={{}}
      />
    </Link>
  );
};

export default RowItem;
