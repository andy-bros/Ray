var nodemailer = require("nodemailer");
var ses = require("nodemailer-ses-transport");

// var transporter = nodemailer.createTransport(
//   ses({
//     accessKeyId: process.env.AWSAccessKeyId,
//     secretAccessKey: process.env.AWSSecretKey
//   })
// );
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
});

const emailRay = (req, res) => {
  console.log(req.body);
  const items = req.session.cart.map((e, i, a) => {
    return `
    ${e.product_name}: x${e.quantity}
    `;
  });

  const {
    emailAddress,
    phoneNumber,
    firstName,
    lastName,
    streetAddress,
    streetAddress2,
    city,
    state,
    zipCode
  } = req.body;
  transporter
    .sendMail({
      from: "raymccollum7@gmail.com",
      to: "raymccollum7@gmail.com",
      subject: `**NEW ORDER**`,
      text: `
      Customer:
      ${firstName} ${lastName},
      ${streetAddress} ${streetAddress2},
      ${city}, ${state} ${zipCode}
      email: ${emailAddress}
      phone-number: ${phoneNumber}

      Request:
        ${items}
      `
    })
    .then(response => {
      res.status(200).send("email sent");
    })
    .catch(console.log);
};
module.exports = {
  emailRay
};
