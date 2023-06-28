import { hashPassword } from "@/lib/auth";
import { validatePassword } from "@/lib/client-input-validation";
import { connectToDatabase } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, birthDate, gender, email, password } =
      req.body;
    const passwordIsValid = validatePassword(password);

    if (!passwordIsValid) {
      return res.status(422).json({
        message:
          "Contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.",
      });
    }

    const client = await connectToDatabase();

    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email: email });
    console.log(usersEmails);

    const hashedPassword = await hashPassword(password);

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

    res.status(201).json({ message: "Created user!" });
  }
}
