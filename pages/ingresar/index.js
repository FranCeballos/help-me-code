import HeadComponent from "@/components/head/Head";
import LogIn from "../../components/auth/LogIn";

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

export default LogInPage;
