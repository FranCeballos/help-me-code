import HeadComponent from "@/components/head/Head";
import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm";
import { checkIfResetTokenExpired } from "@/lib/user";
import { Button } from "@mui/material";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ResetPasswordPage = ({ tokenData, email }) => {
  const [success, setSuccess] = useState(false);
  const successHandler = () => {
    setSuccess(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!tokenData.error ? (
          !success ? (
            <motion.div
              key="change"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeadComponent
                title="Cambiar contraseña"
                description="Hello"
              ></HeadComponent>
              <ResetPasswordForm
                userId={tokenData._id}
                userEmail={email}
                onSuccess={successHandler}
              />
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="center-children"
            >
              <h1 className="main-clip-success">
                !Contraseña cambiada con exito!
              </h1>
              <Link href="/ingresar" className="link__style-off">
                <Button variant="contained">Ingresar</Button>
              </Link>
            </motion.div>
          )
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="center-children"
          >
            <h1 className="main-clip-text">
              !Ups! Tu solicitud para cambiar la contraseña es erronea o ha
              expirado.
            </h1>
            <Link
              href="/cambiar-password"
              className="link__style-off width__fit"
            >
              <motion.p
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="simple-white-text"
              >
                Genera una nueva aqui
              </motion.p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { token, email } = context.params;
  const tokenData = await checkIfResetTokenExpired(token, email);

  return {
    props: {
      tokenData,
      email,
    },
  };
};

export default ResetPasswordPage;
