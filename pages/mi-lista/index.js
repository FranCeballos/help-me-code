import NavBarLayout from "@/components/layout/NavBarLayout";
import HeadComponent from "@/components/head/Head";
import MyFavs from "@/components/favs/MyFavs";
import { getAllFavs } from "@/lib/user";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
const MyFavsPage = () => {
  return (
    <NavBarLayout>
      <HeadComponent
        title="Mi Lista"
        description="Mira todos tus series guardadas"
      ></HeadComponent>
      <MyFavs />
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
  const userFavs = await getAllFavs(session.email);

  return {
    props: {
      userFavs: [],
    },
  };
};

export default MyFavsPage;
