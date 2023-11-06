import {
  validateEmail,
  validatePassword,
  matchPasswords,
} from "@/lib/client-input-validation";
import { connectToDatabase } from "@/lib/db";
import { getUser } from "@/lib/user";
import { hash } from "bcryptjs";
import { ObjectId } from "mongodb";
import sgMail from "@sendgrid/mail";
import { resetEmailHTML } from "@/lib/mails";
import { hashPassword } from "@/lib/auth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let client;
    try {
      const email = req.body.email;
      const emailIsValid = await validateEmail(email);

      if (!emailIsValid) {
        const error = new Error("Invalid email format.");
        error.status = 422;
        throw error;
      }

      const user = await getUser({ email: email }, { _id: 1 });
      if (user.length === 0) {
        const error = new Error("No user registered with that email.");
        error.status = 404;
        throw error;
      }
      const userId = user[0]._id;
      const token = await hash("randomSTRING010203", 12);
      const fixedToken = token.replaceAll("/", ".");

      client = await connectToDatabase();
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
        subject: "Reset Your Password",
        html: resetEmailHTML(
          "Reset Your Password",
          "Change password",
          `https://${req.headers.host}/reset-password/${fixedToken}/${email}`,
          "Don't worry. We've all been here."
        ),
      });

      res.status(200).json(userId);
      client.close();
    } catch (error) {
      client?.close();
      res.status(error.status).json({ error: true, message: error.message });
    }
  }
  if (req.method === "PATCH") {
    let client;
    try {
      const { password, passwordConfirm, userId, userEmail } = req.body;
      const passwordIsValid = validatePassword(password);
      const passwordsMatch = matchPasswords(password, passwordConfirm);
      if (!passwordIsValid || !passwordsMatch) {
        return res.status(422).json({
          passwordError: !passwordIsValid,
          passwordConfirmError: !passwordsMatch,
          passwordConfirmMessage: !passwordsMatch
            ? "Passwords don't match."
            : " ",
        });
      }

      const passwordSuccessObj = {
        passwordError: false,
        passwordConfirmError: false,
        passwordConfirmMessage: " ",
      };
      const hashedPassword = await hashPassword(password);

      client = await connectToDatabase();
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
      await sgMail.send({
        to: userEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: "Password Updated",
        html: resetEmailHTML(
          "Password successfully updated",
          "Sign In",
          `https://${req.headers.host}/signin`,
          "Password successfully updated"
        ),
      });
      client.close();
      res
        .status(201)
        .json({ message: "Password updated", errors: passwordSuccessObj });
    } catch (error) {
      client?.close();
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
