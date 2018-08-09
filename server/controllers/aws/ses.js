var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
});
const emailRayOrder = (req, res) => {
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
    },
    function(err, info) {
      if (err) console.log(err);
      else {
        res.status(200).send("succcess");
      }
    }
  );
  transporter.sendMail(
    {
      from: "raymccollum7@gmail.com",
      to: emailAddress,
      subject: `***Order Receipt PastorRay.com***`,
      html: `
      <div style="">
      <h1>Thank you ${firstName} ${lastName}!<h1>
      <p>Your order will be processed immediately. I will do my best to
      get your order to you as soon as possible!</p>
      <p>Feel free to reach out to me directly at <a>raymccollum7@gmail.com</a> regarding your order</p>
      
      <h2>Order Receipt:</h2>

      ${firstName} ${lastName}<br>
      ${streetAddress} ${streetAddress2}<br>
      ${city}, ${state} ${zipCode}<br>
      email: ${emailAddress}<br>
      phone-number: ${phoneNumber}<br>

        ${items}
      `
    },
    function(err, info) {
      if (err) console.log(err);
      else {
        return;
      }
    }
  );
};
module.exports = {
  emailRayOrder
};
