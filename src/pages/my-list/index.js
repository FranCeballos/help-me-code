import { ObjectId } from "mongodb";
import { getUser } from "@/src/lib/user";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getAllSeries } from "@/src/lib/series";

import NavBarLayout from "@/src/components/layout/NavBarLayout";
import HeadComponent from "@/src/components/head/Head";
import MyFavs from "@/src/components/favs/MyFavs";
const MyFavsPage = (props) => {
  const userFavs = props.userFavs;
  return (
    <NavBarLayout>
      <HeadComponent
        title="My List"
        description="Save all your favorite playlists."
      ></HeadComponent>
      <MyFavs userFavs={userFavs} />
    </NavBarLayout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permatent: false,
      },
    };
  }
  const user = await getUser(
    { email: session.user.email },
    { _id: 1, favList: 1 },
    false
  );
  const userFavs = user[0].favList;
  const favsIds = userFavs.map((id) => {
    return new ObjectId(id);
  });
  const allFavs = await getAllSeries({ _id: { $in: favsIds } });
  return {
    props: {
      userFavs: allFavs,
    },
  };
};

export default MyFavsPage;
