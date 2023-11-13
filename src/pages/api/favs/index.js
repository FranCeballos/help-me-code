import { addOrDeleteFavToUser, getUser } from "@/src/lib/user";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
      const [allFavs] = await getUser({ email: userEmail }, { favList: 1 });
      res.status(200).json({ allFavs: allFavs.favList });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { serieId, serieIsInFavs } = req.body;
      const [user] = await getUser({ email: session.user.email }, { _id: 1 });
      const result = await addOrDeleteFavToUser(
        String(user._id),
        serieId,
        !serieIsInFavs
      );

      if (result.error) {
        res.status(result.status || 500).json({ message: result.message });
        return;
      }

      res.status(200).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
