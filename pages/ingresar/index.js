import HeadComponent from "@/components/head/Head";
import LogIn from "../../components/auth/LogIn";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const LogInPage = () => {
  return (
    <>
      <HeadComponent
        title="Ingresar"
        description="Ingresa para ver todos tus favoritos"
      ></HeadComponent>
      <LogIn />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permatent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default LogInPage;
