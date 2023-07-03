import HeadComponent from "@/components/head/Head";
import NavBarLayout from "@/components/layout/NavBarLayout";

const Serie = () => {
  return (
    <>
      <HeadComponent
        title="Inicio"
        description="En esta plataforma encontrarás contenido de series, cursos y podcast que te brindarán herramientas que fortalezcan tu vida y equipen tu llamado"
      ></HeadComponent>
      <NavBarLayout></NavBarLayout>
    </>
  );
};

// export const getStaticProps = async (context) => {};

export default Serie;
