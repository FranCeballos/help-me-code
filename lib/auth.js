import { hash } from "bcryptjs";

export const createUser = async (signupInfo) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  });

  const parsedData = response.json();

  if (!response.ok) {
    throw new Error(parsedData.message || "Something went wrong");
  }

  return parsedData;
};

export const validateEmailWithServer = async (email) => {
  const response = await fetch("/api/auth/signup/validate-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  const parsedData = response.json();

  if (!response.ok) {
    throw new Error(parsedData.message || "Something went wrong");
  }

  return parsedData;
};

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
