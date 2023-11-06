import { validateEmail } from "@/lib/client-input-validation";
import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      return res
        .status(422)
        .json({ message: "Enter a valid email.", emailIsValid });
    }

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Can't connect to database! Try again in a few minutes.",
      });
      return;
    }
    const db = client.db();

    let existingUser;
    try {
      existingUser = await db.collection("users").findOne({ email: email });
    } catch (error) {
      res.status(500).json({
        message: "Can't connect to database! Try again in a few minutes.",
        emailIsValid,
      });
      client.close();
      return;
    }

    if (existingUser) {
      res.status(422).json({
        message: "Email is already registered. Use a different one.",
        emailIsValid,
      });
      client.close();
      return;
    }

    client.close();
    res.status(201).json({ message: "Invalid email", emailIsValid });
  }
};

export default handler;
