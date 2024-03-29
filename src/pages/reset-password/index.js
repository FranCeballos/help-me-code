import HeadComponent from "@/src/components/head/Head";
import SendResetEmailForm from "@/src/components/auth/reset-password/SendResetEmailForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import classes from "@/src/components/auth/AuthForm.module.css";

const SendEmailPage = () => {
  return (
    <>
      <HeadComponent
        title="Reset Password"
        description="Don't worry. We've all been here."
      ></HeadComponent>
      <div className={classes["auth__box-center"]}>
        <SendResetEmailForm />
      </div>
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

export default SendEmailPage;
