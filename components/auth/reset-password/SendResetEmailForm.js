import { useState, useRef } from "react";
import Link from "next/link";
import { TextField, Button, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import TitleForm from "../signup-steps/TitleForm";

import classes from "../AuthForm.module.css";

const SendResetEmailForm = () => {
  const initialErrorObj = { error: false, message: " " };
  const [emailError, setEmailError] = useState(initialErrorObj);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();

  const emailSubmitHandler = async () => {
    setLoading(true);
    const email = emailRef.current.value.trim().toLowerCase();

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const parsedResponse = await response.json();

    if (parsedResponse.error) {
      setEmailError({ error: true, message: parsedResponse.message });
      setLoading(false);
      return;
    }
    setEmailError(initialErrorObj);
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="sendmail"
            className={classes["signup__wrapper"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TitleForm
              title="Reset your password"
              description="You're not alone. We've all been here."
            />
            <div className={classes["auth__inputs-box"]}>
              <TextField
                inputRef={emailRef}
                id="email"
                label="Email linked to your account"
                variant="outlined"
                fullWidth
                margin="dense"
                error={emailError.error}
                helperText={emailError.error ? emailError.message : " "}
              />
            </div>
            <div className={classes["auth__buttons-box-between"]}>
              {loading ? (
                <div></div>
              ) : (
                <Link href="/ingresar">
                  <Button>Back</Button>
                </Link>
              )}
              {loading ? (
                <CircularProgress
                  style={{ width: 34.75, height: 34.75, marginRight: 30 }}
                />
              ) : (
                <Button onClick={emailSubmitHandler} variant="contained">
                  Send email
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="center-children"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="main-clip-success">
              Email sent for resetting your password.
            </h1>
            <Link href="/signin" className="link__style-off width__fit">
              <Button variant="contained">Sign In</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SendResetEmailForm;
