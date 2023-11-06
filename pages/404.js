import HeadComponent from "@/components/head/Head";
import NavBarLayout from "@/components/layout/NavBarLayout";

const NotFoundPage = () => {
  return (
    <>
      <HeadComponent
        title="Not Found"
        description="Ups! Resource not found."
      ></HeadComponent>
      <NavBarLayout>
        <div className="center-children">
          <h1 className="main-clip-text">Ups! Resource not found.</h1>
          <p className="simple-white-text">404 Error</p>
        </div>
      </NavBarLayout>
    </>
  );
};

export default NotFoundPage;
