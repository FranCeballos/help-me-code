import HeadComponent from "@/components/head/Head";
import NavBarLayout from "@/components/layout/NavBarLayout";

const NotFoundPage = () => {
  return (
    <>
      <HeadComponent
        title="No encontrado"
        description="No se ha encontrado el recurso solicitado"
      ></HeadComponent>
      <NavBarLayout>
        <div className="center-children">
          <h1 className="main-clip-text">
            !Ups! Ha habido un problema en los servidores.
          </h1>
          <p className="simple-white-text">
            Error 500. Prueba de nuevo en un minuto.
          </p>
        </div>
      </NavBarLayout>
    </>
  );
};

export default NotFoundPage;
