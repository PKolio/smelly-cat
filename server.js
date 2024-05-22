const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

// Body parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  console.log('Received request:', req.body);  // Log incoming requests for debugging
  try {
    const { fullName, email, city, postalCode, address, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pavlos.kol1993@gmail.com',
        pass: 'sjpy viri uglb veey'
      }
    });

    const mailOptions = {
      from: 'pavlos.kol1993@gmail.com',
      to: 'pavlos-kol1993@hotmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${fullName}\nEmail: ${email}\nCity: ${city}\nPostal Code: ${postalCode}\nAddress: ${address}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
