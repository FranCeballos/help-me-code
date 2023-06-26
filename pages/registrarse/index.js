import HeadComponent from "@/components/head/Head";
import SignUpForm from "../../components/auth/SignUpForm";

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

export default SignUpPage;
