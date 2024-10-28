import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { sendVerificationEmail } from "../../utils/emailUtils";

export default async function register(req, res) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    sendVerificationEmail(newUser.email, token);

    res.status(201).json({ message: "User created, verification email sent." });
  } catch (error) {
    res.status(500).json({ error: "Registration failed." });
  }
}
