import sgMail from "@sendgrid/mail";
import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "../../../../lib/db";
import { resetEmailHTML } from "@/lib/mails";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, birthDate, gender, email, password } =
      req.body;

    if (!password) {
      res.status(422).json({
        message: "Error al enviar contraseña al servidor.",
        serverError: true,
      });
      return;
    }

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Fallo al conectar con la base de datos! Pruebe en un minuto",
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
      });
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      console.log(email);
      const response = await sgMail.send({
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: "Bienvenido/a a C3 Plus",
        html: resetEmailHTML(
          "Cuenta creada con éxito",
          "Explorá",
          `https://${req.headers.host}/`,
          "Encontrá contenido de series, cursos y podcast que te brinden herramientas que fortalezcan tu vida y equipen tu llamado"
        ),
      });
      console.log(response);
    } catch (error) {
      res.status(500).json({
        message:
          "Fallo al crear usuario en la base de datos! Pruebe en un minuto",
        serverError: true,
      });
      client.close();
      return;
    }
    console.log(email);

    res.status(201).json({ message: "Created user!", serverError: false });
    client.close();
  }
}
