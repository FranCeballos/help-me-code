import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, birthDate, gender, email, password } =
      req.body;

    if (!password) {
      res.status(422).json({
        message: "Fallo al validar contraseña",
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
    } catch (error) {
      res.status(500).json({
        message:
          "Fallo al crear usuario en la base de datos! Pruebe en un minuto",
        serverError: true,
      });
      client.close();
      return;
    }

    res.status(201).json({ message: "Created user!", serverError: false });
    client.close();
  }
}
