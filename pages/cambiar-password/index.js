import HeadComponent from "@/components/head/Head";
import SendResetEmailForm from "@/components/auth/reset-password/SendResetEmailForm";
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

export default SendEmailPage;
