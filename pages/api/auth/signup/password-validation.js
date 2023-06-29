import {
  validatePassword,
  matchPasswords,
} from "@/lib/client-input-validation";

const handler = async (req, res) => {
  const { password, passwordConfirm } = req.body;
  const passwordIsValid = validatePassword(password);
  const passwordsMatch = matchPasswords(password, passwordConfirm);
  if (!passwordIsValid || !passwordsMatch) {
    return res.status(422).json({
      passwordError: !passwordIsValid,
      passwordConfirmError: !passwordsMatch,
      passwordConfirmMessage: !passwordsMatch
        ? "Las contraseñas no coinciden"
        : " ",
    });
  }

  res.status(200).json({
    passwordError: false,
    passwordConfirmError: false,
    passwordConfirmMessage: " ",
  });
};

export default handler;
