import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    text: `Click the link to verify your email: ${process.env.FRONTEND_URL}/verify-email?token=${token}`,
  };

  return transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    text: `Your password reset code is: ${resetToken}`,
  };

  return transporter.sendMail(mailOptions);
};
