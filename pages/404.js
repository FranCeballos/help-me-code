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
            !Ups! No hemos encontrado el recurso solicitado.
          </h1>
          <p className="simple-white-text">Error 404</p>
        </div>
      </NavBarLayout>
    </>
  );
};

export default NotFoundPage;
