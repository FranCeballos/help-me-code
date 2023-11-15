import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import NavBarLayout from "@/src/components/layout/NavBarLayout";
import HeadComponent from "@/src/components/head/Head";
import ManagerContainer from "@/src/components/manager/ManagerContainer";
import { getAllSubjects } from "@/src/lib/subjects";

const ContentManagerPage = ({ subjects }) => {
  return (
    <NavBarLayout>
      <HeadComponent
        title="Content Manager"
        description="Manage all your content"
      ></HeadComponent>
      <ManagerContainer subjects={JSON.parse(subjects)} />
    </NavBarLayout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session && !session.user.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permatent: false,
      },
    };
  }
  const subjects = await getAllSubjects();
  return {
    props: { subjects: JSON.stringify(subjects) },
  };
};

export default ContentManagerPage;
