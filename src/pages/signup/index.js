import HeadComponent from "@/src/components/head/Head";
import SignUpForm from "../../components/auth/SignUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const SignUpPage = () => {
  return (
    <>
      <HeadComponent
        title="Sign Up"
        description="Create an account and save your favorite videos."
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
