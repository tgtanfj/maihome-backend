const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const {
    name,
    email,
    phone,
    hotelNameAndAddress,
    date,
    numberOfParticipants,
    tour,
    message,
  } = req.body;

  console.log(
    "data",
    name,
    email,
    phone,
    hotelNameAndAddress,
    date,
    numberOfParticipants,
    tour,
    message
  );

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Booking From Website",
      text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Hotel Name Add Address: ${hotelNameAndAddress}
      Date: ${date}
      Number of participants: ${numberOfParticipants}
      Tour: ${tour}
      message: ${message ? message : ""}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
