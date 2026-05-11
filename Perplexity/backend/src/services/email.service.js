const nodemailer = require("nodemailer");

// Transporter ek baar banao — Gmail SMTP se connect
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

const sendWelcomeEmail = async (toEmail, username) => {
  const mailOptions = {
    from: `"MyApp" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to MyApp!",
    html: `
      <h2>Hello ${username}! 👋</h2>
      <p>Tumhara account successfully register ho gaya.</p>
      <p>Welcome to MyApp!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };