import NavBarLayout from "@/components/layout/NavBarLayout";
import HeadComponent from "@/components/head/Head";
import MyFavs from "@/components/favs/MyFavs";
import { getUser } from "@/lib/user";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getAllSeries } from "@/lib/series";
import { ObjectId } from "mongodb";
const MyFavsPage = (props) => {
  const userFavs = props.userFavs;
  return (
    <NavBarLayout>
      <HeadComponent
        title="Mi Lista"
        description="Mira todos tus series guardadas"
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
