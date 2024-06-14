import nodemailer from "nodemailer";

async function sendEmail({ email, userID, token }) {
  try {
    // Create a nodemailer transport
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a71a804fcdeed7",
        pass: "a042cfc3adbe94",
      },
    });

    // Compose email options
    const mailOptions = {
      from: "ashlythomas@gmail.com",
      to: email,
      subject: "Reset your password",
      html: `<br /><p>Click <a href="${process.env.DOMAIN_HOST}/ResetPassword/${userID}/${token}">here</a> to reset your password.</p><br /><br /><br />Please ignore this mail, in case you didnot initiate a request to reset your password.`,
    };

    // Send the email
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default sendEmail;
