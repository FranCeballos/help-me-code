import { hash, compare } from "bcryptjs";

export const createUser = async (signupInfo) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInfo),
    });

    const parsedData = await response.json();

    if (!response.ok) {
      const error = new Error(parsedData.message || "Error creating user");
      error.serverError = parsedData.serverError;
      error.passwordError = parsedData.passwordError;
      error.passwordConfirmError = parsedData.passwordConfirmError;
      error.passwordConfirmMessage = parsedData.passwordConfirmMessage;
    }

    return parsedData;
  } catch ({
    message,
    serverError,
    passwordError,
    passwordConfirmError,
    passwordConfirmMessage,
  }) {
    return {
      serverError,
      message,
      passwordError,
      passwordConfirmError,
      passwordConfirmMessage,
    };
  }
};

export const validateEmailWithServer = async (email) => {
  try {
    const response = await fetch("/api/auth/signup/email-validation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const parsedData = await response.json();

    if (!response.ok) {
      throw new Error(parsedData.message || "Something went wrong");
    }

    return parsedData;
  } catch (error) {
    return { message: error.message, emailIsValid: false };
  }
};

export const validatePasswordWithServer = async (password, passwordConfirm) => {
  try {
    const response = await fetch("/api/auth/signup/password-validation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, passwordConfirm }),
    });

    const parsedData = await response.json();

    if (!response.ok) {
      const error = new Error("Something went wrong validating passwords");
      error.passwordErrors = parsedData;
      throw error;
    }

    return parsedData;
  } catch (error) {
    return error.passwordErrors;
  }
};

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  } catch (error) {
    return error;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    return error;
  }
};
