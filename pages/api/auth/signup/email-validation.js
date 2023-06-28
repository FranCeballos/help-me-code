import { validateEmail } from "@/lib/client-input-validation";
import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      return res.status(422).json({ message: "Formato de email no valido." });
    }

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      return res.status(422).json({
        message: "Ya hay una cuenta asociada a ese email. Usar uno distinto.",
      });
    }

    return res.status(201).json({ message: "Email valido" });
  }
};

export default handler;
