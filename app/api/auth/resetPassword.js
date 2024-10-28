import bcrypt from "bcryptjs";
import { prisma } from "../../config/db";
import { sendResetPasswordEmail } from "../../utils/emailUtils";

export default async function resetPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
    await prisma.user.update({
      where: { email },
      data: { resetToken },
    });

    sendResetPasswordEmail(email, resetToken);
    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(500).json({ error: "Reset password failed." });
  }
}
