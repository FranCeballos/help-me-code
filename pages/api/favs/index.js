import { addFavToUser, deleteFavFromUser, getAllFavs } from "@/lib/user";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/lib/user";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res
      .status(403)
      .json({ message: "Can't change favs without an user session" });
    return;
  }
  const userEmail = session.user.email;
  if (req.method === "GET") {
    try {
      const user = await getUserByEmail(userEmail);
      const allFavs = await getAllFavs(String(user._id));

      res.status(200).json({ allFavs });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { serieId, addFav } = req.body;
      const user = await getUserByEmail(session.user.email);
      if (addFav) {
        const result = await addFavToUser(String(user._id), serieId);

        if (result.error) {
          res.status(result.status || 500).json({ message: result.message });
          return;
        }

        res.status(201).json({ message: "Serie añadida a Mi Lista" });
      } else {
        const result = await deleteFavFromUser(String(user._id), serieId);

        if (result.error) {
          res.status(result.status || 500).json({ message: result.message });
          return;
        }

        res.status(200).json({ message: "Serie eliminada de Mi Lista" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
