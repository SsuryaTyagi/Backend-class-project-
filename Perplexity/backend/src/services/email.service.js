require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendVerificationEmail = async (toEmail, username, token,to, subject, text, html ) => {
  const verifyUrl = `http://localhost:3000/verify-email/${token}`;

  const mailOptions = {
    from: `"Preplexity" <${process.env.GOOGLE_USER}>`,
    to: toEmail || to,
    subject: subject || "Verify Your Email — Preplexity",
    html: html || `
      <!DOCTYPE html>
      <html>
        <body style="margin:0; padding:0; background:#f4f4f4; font-family: Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table width="600" cellpadding="0" cellspacing="0"
                  style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                  <!-- Header -->
                  <tr>
                    <td style="background:#4F46E5; padding:32px; text-align:center;">
                      <h1 style="color:#ffffff; margin:0; font-size:28px;">Preplexity</h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 32px;">
                      <h2 style="color:#111827; margin:0 0 12px;">Hello, ${username}! 👋</h2>
                      <p style="color:#6B7280; font-size:15px; line-height:1.6;">
                        Thank you for registering at <strong>Preplexity</strong>.
                        Please verify your email address by clicking the button below.
                      </p>
                      <p style="color:#6B7280; font-size:14px;">
                        This link will expire in <strong>24 hours</strong>.
                      </p>

                      <!-- Button -->
                      <div style="text-align:center; margin: 32px 0;">
                        <a href="${verifyUrl}"
                          style="background:#4F46E5; color:#ffffff; padding:14px 32px;
                                 border-radius:6px; text-decoration:none; font-size:16px;
                                 font-weight:bold; display:inline-block;">
                          Verify My Email
                        </a>
                      </div>

                      <p style="color:#9CA3AF; font-size:13px;">
                        If button not working to use this link:
                      </p>
                      <p style="word-break:break-all;">
                        <a href="${verifyUrl}" style="color:#4F46E5; font-size:13px;">${verifyUrl}</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#F9FAFB; padding:24px 32px; text-align:center;
                                border-top:1px solid #E5E7EB;">
                      <p style="color:#9CA3AF; font-size:12px; margin:0;">
                        © 2025 Preplexity. All rights reserved.
                      </p>
                      <p style="color:#9CA3AF; font-size:12px; margin:6px 0 0;">
                        Agar aapne register nahi kiya toh is email ko ignore karein.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };