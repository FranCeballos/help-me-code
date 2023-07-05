import NavBarLayout from "@/components/layout/NavBarLayout";
import HeadComponent from "@/components/head/Head";
import MyFavs from "@/components/favs/MyFavs";
import { getAllFavsDataByEmail } from "@/lib/user";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
const MyFavsPage = (props) => {
  const userFavs = props.userFavs;
  console.log(userFavs);
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
  const userFavs = await getAllFavsDataByEmail(session.user.email);

  return {
    props: {
      userFavs,
    },
  };
};

export default MyFavsPage;
