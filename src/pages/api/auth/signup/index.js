import sgMail from "@sendgrid/mail";
import { hashPassword } from "@/src/lib/auth";
import { connectToDatabase } from "@/src/lib/db";
import { resetEmailHTML } from "@/src/lib/mails";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, birthDate, gender, email, password } =
      req.body;

    if (!password) {
      res.status(422).json({
        message: "Invalid password received in server.",
        serverError: true,
      });
      return;
    }

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Can't connect to database! Try again in a few minutes.",
        serverError: true,
      });
      return;
    }

    const db = client.db();

    let hashedPassword;
    try {
      hashedPassword = await hashPassword(password);
    } catch (error) {
      client.close();
      res.status(500).json({
        message: error.message,
        serverError: true,
      });
      return;
    }

    try {
      const result = await db.collection("users").insertOne({
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        hashedPassword,
        favList: [],
        watched: [],
        avatar: null,
        createdDate: new Date(Date.now()).toLocaleDateString(),
        resetToken: null,
        resetTokenExpiration: null,
      });
      client.close();
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const response = await sgMail.send({
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: "Welcome to Help Me Code",
        html: resetEmailHTML(
          "Your Help Me Code account has been created successfully.",
          "Explorá",
          `https://${req.headers.host}/`,
          "The best coding videos. All in one place."
        ),
      });
      res.status(201).json({ message: "User created!", serverError: false });
    } catch (error) {
      client.close();
      res.status(500).json({
        message: "Could not create user! Try again in a few minutes.",
        serverError: true,
      });
      return;
    }
  }
}
