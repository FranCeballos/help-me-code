import { getUser } from "@/src/lib/user";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import NavBarLayout from "@/src/components/layout/NavBarLayout";
import HeadComponent from "@/src/components/head/Head";
import MyFavs from "@/src/components/favs/MyFavs";
const MyFavsPage = (props) => {
  return (
    <NavBarLayout>
      <HeadComponent
        title="My List"
        description="Save all your favorite playlists."
      ></HeadComponent>
      <MyFavs userFavs={[]} />
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
  return {
    props: {},
  };
};

export default MyFavsPage;
