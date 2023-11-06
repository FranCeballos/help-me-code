import HeadComponent from "@/components/head/Head";
import SignUpForm from "../../components/auth/SignUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const SignUpPage = () => {
  return (
    <>
      <HeadComponent
        title="Registrarse"
        description="Crea una cuenta para guardar todos tus favoritos"
      ></HeadComponent>
      <SignUpForm />
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

export default SignUpPage;
