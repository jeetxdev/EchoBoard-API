import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: process.env.SMTP_PORT as unknown as number,
  secure: !!process.env.SMTP_SECURE, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_KEY,
  },
});

const sendMail = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL as string,
    to,
    subject,
    html,
  });
  return info;
};
export default sendMail;
