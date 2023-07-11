import {
  validateEmail,
  validatePassword,
  matchPasswords,
} from "@/lib/client-input-validation";
import { connectToDatabase } from "@/lib/db";
import { getUserIdByEmail } from "@/lib/user";
import { hash } from "bcryptjs";
import { ObjectId } from "mongodb";
import sgMail from "@sendgrid/mail";
import { resetEmailHTML } from "@/lib/mails";
import { hashPassword } from "@/lib/auth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      console.log(req.headers.host);
      const email = req.body.email;
      const emailIsValid = await validateEmail(email);

      if (!emailIsValid) {
        const error = new Error("Formato de email invalido");
        error.status = 422;
        throw error;
      }

      const userId = await getUserIdByEmail(email);
      if (userId.error) {
        const error = new Error("No hay un usuario registrado con ese email.");
        error.status = 404;
        throw error;
      }

      const token = await hash("randomSTRING010203", 12);
      const fixedToken = token.replaceAll("/", ".");

      const client = await connectToDatabase();
      const db = client.db();
      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            resetToken: fixedToken,
            resetTokenExpiration: Date.now() + 3600000,
          },
        }
      );
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send({
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: "Cambiar contraseña.",
        html: resetEmailHTML(
          "Recuperá tu cuenta",
          "Cambiar contraseña",
          `https://${req.headers.host}/cambiar-password/${fixedToken}/${email}`,
          "No estás solo/a. Todos hemos estado aquí en algún momento. Recupera tu cuenta."
        ),
      });

      res.status(200).json(userId);
    } catch (error) {
      res.status(error.status).json({ error: true, message: error.message });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { password, passwordConfirm, userId, userEmail } = req.body;
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

      const passwordSuccessObj = {
        passwordError: false,
        passwordConfirmError: false,
        passwordConfirmMessage: " ",
      };
      const hashedPassword = await hashPassword(password);

      const client = await connectToDatabase();
      const db = client.db();
      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            hashedPassword: hashedPassword,
            resetToken: null,
            resetTokenExpiration: null,
          },
        }
      );
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      console.log(userEmail);
      await sgMail.send({
        to: userEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: "Contraseña cambiada",
        html: resetEmailHTML(
          "Contraseña cambiada con éxito.",
          "Ingresar",
          `https://${req.headers.host}/ingresar`,
          "Éxito en el cambio de contraseña"
        ),
      });
      res
        .status(201)
        .json({ message: "Password updated", errors: passwordSuccessObj });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
