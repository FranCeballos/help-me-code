import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, birthDate, gender, email, password } =
      req.body;
    console.log(req.body);

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
    const hashedPassword = await hashPassword(password);

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
        message: "Fallo al conectar con la base de datos ! Pruebe en un minuto",
        serverError: true,
      });
      return;
    }

    res.status(201).json({ message: "Created user!", serverError: false });
  }
}
