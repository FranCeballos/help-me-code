import HeadComponent from "@/components/head/Head";
import SendResetEmailForm from "@/components/auth/reset-password/SendResetEmailForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import classes from "@/components/auth/AuthForm.module.css";

const SendEmailPage = () => {
  return (
    <>
      <HeadComponent
        title="Cambiar contraseña"
        description="Crea una cuenta para guardar todos tus favoritos"
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
