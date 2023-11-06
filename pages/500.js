import HeadComponent from "@/components/head/Head";
import NavBarLayout from "@/components/layout/NavBarLayout";

const NotFoundPage = () => {
  return (
    <>
      <HeadComponent
        title="Server Error"
        description="There has been an error in the server."
      ></HeadComponent>
      <NavBarLayout>
        <div className="center-children">
          <h1 className="main-clip-text">
            Ups! There has been an error in the server.
          </h1>
          <p className="simple-white-text">
            500 Error. Try again in a few minutes.
          </p>
        </div>
      </NavBarLayout>
    </>
  );
};

export default NotFoundPage;
