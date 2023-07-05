import { validateEmail } from "@/lib/client-input-validation";
import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      return res
        .status(422)
        .json({ message: "Formato de email no valido.", emailIsValid });
    }

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Fallo al conectar con la base de datos! Pruebe en un minuto",
      });
      return;
    }
    const db = client.db();

    let existingUser;
    try {
      existingUser = await db.collection("users").findOne({ email: email });
    } catch (error) {
      res.status(500).json({
        message: "Fallo al conectar con la base de datos! Pruebe en un minuto",
        emailIsValid,
      });
      client.close();
      return;
    }

    if (existingUser) {
      res.status(422).json({
        message: "Ya hay una cuenta asociada a ese email. Usar uno distinto.",
        emailIsValid,
      });
      client.close();
      return;
    }

    res.status(201).json({ message: "Email valido", emailIsValid });
    client.close();
  }
};

export default handler;
