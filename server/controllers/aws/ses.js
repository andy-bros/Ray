var nodemailer = require("nodemailer");
var ses = require("nodemailer-ses-transport");

// var transporter = nodemailer.createTransport(
//   ses({
//     accessKeyId: process.env.AWSAccessKeyId,
//     secretAccessKey: process.env.AWSSecretKey
//   })
// );
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
});

const emailRay = (req, res) => {
  // console.log(req.body)
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

  transporter.sendMail(
    {
      from: "raymccollum7@gmail.com",
      to: "josephiznot@gmail.com",
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
    },
    function(err, info) {
      if (err) console.log(err);
      else {
        res.status(200).send("succcess");
      }
    }
  );
};
module.exports = {
  emailRay
};
