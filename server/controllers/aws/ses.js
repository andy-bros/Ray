var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
});
const styles = `
<style>
* {
box-sizing: border-box;
color: inherit;
font-size: inherit;
font-family: "Lato", sans-serif;
outline: 0;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
font: inherit;
font-weight: 100;
font-family: "Lato", sans-serif;
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
display: block;
}
body {
line-height: 1;
}
ol,
ul {
list-style: none;
}
blockquote,
q {
quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
content: "";
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}    
h2{
font-size: 30px;
}
h4{
font-size: 24px;
}
.container{
margin: 0 auto;
width: 95vw;
max-width: 800px;
height: auto;
border-radius: 7px;
line-height: 21px;
}
.email-container{
  background:#f4f3f4;
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:space-around;
  align-items:center;
  flex-direction:column;
  padding:20px;
}
.receipt{
  display:flex;
  justify-content:space-around;
  align-items:flex-start;
  flex-direction:column;
}
</style>`;
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
      html: `
      ${styles}
      <div class="email-container">
      <div class="container">
      <h2>Smiles Pastor Ray! Someone has requested some of your products!</h2>
      <p>Their information can be found below.</p>
      </div>
      <div class="container">
      <h4>Order Information</h4>
        <h6>${firstName} ${lastName},</h6>
        <h6>${streetAddress} ${streetAddress2},<h6>
        <h6>${city}, ${state} ${zipCode}</h6>
        <h6>email: ${emailAddress}</h6>
        <h6>phone-number: ${phoneNumber}</h6>
          <br>
      <h4>Request:</h4>
        ${items}
        </div>
        </div>
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
      ${styles}
      <div class="email-container">
      <div class="greetings container">
      <h2>Greetings ${firstName} ${lastName}!</h2><br>
      <p>Your order has been received and will be processed immediately.</p>
      <p>
      I will do my best to
      get your products to you as soon as possible! Feel free to reach out 
      to me directly at <a>rwmccollu@att.net</a> regarding your order status.
      Although my products are free of charge, my website and my work is only made possible through donations from loyal customers
      like you. If you feel inclined, please leave a <a href="https://www.pastorray.com/donate">donation</a> next time you visit my site to allow me to keep spreading the Lord's 
      word. All support is appreciated.
      </p><br>
      <p>Have a blessed day,</p><br>
      <h3>Pastor Ray McCollum</h3>
      <img src="cid:rayLOGO" style="width:50px" />
      </div><br>
   
      <div class="receipt container">
      <h4>Order Receipt:</h4><

      <h6>${firstName} ${lastName}</h6>
      <h6>${streetAddress} ${streetAddress2}</h6>
      <h6>${city}, ${state} ${zipCode}</h6>
      <h6>email: ${emailAddress}</h6>
      <h6>phone-number: ${phoneNumber}</h6>
      <h6>${items}</h6>
      </div>
      </div>

      `,
      attachments: [
        {
          filename: "rayLOGO.png",
          path:
            "/Users/J.D.Andy/freelance/Ray/server/controllers/aws/rayLOGO.png",
          cid: "rayLOGO" //same cid value as in the html img src
        }
      ]
    },
    function(err, info) {
      if (err) console.log(err);
      else {
        console.log(info);
      }
    }
  );
};
const emailDonation = (req, res) => {
  const { amount, name, email, checked } = req.body;
  transporter.sendMail(
    {
      from: "raymccollum7@gmail.com",
      to: "raymccollum7@gmail.com",
      subject: `**NEW DONATION**`,
      html: `
      ${styles}
      <div class="email-container">
        <div class="container">
          <h2>Smiles Pastor Ray! Someone has just made a donation!</h2>
          <p>
          Their information can be found below if you would like 
          to send them a personal email! 
          </p>
        </div>
        <div class="container">
          <h4>Donor's Information</h4>
          <h6>${name},</h6>
          <h6>email: ${email}</h6>
          <h6>Amount: ${amount}</h6>
          <h6>Frequency: ${checked}</h6>
          <br>
        </div>
      </div>
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
      to: email,
      subject: `***Donation Receipt PastorRay.com***`,
      html: `
      ${styles}
      <div class="email-container">
      <div class="greetings container">
      <h2>Greetings ${name}!</h2><br>
      <p>Your donation is much appreciated!</p>
      <p>
       I am able to continue spreading Lord's word through donations like yours. Every donation goes a long way.
      </p><br>
      <p>Have a blessed day,</p><br>
      <h3>Pastor Ray McCollum</h3>
      <img src="cid:rayLOGO" style="width:50px" />
      </div><br>
   
      <div class="receipt container">
      <h4>Donation Receipt:</h4><

      <h6>${name}</h6>
      <h6>Donation amount: ${amount}</h6>
      <h6>Frequency: ${checked}</h6>
      </div>
      </div>

      `,
      attachments: [
        {
          filename: "rayLOGO.png",
          path:
            "/Users/J.D.Andy/freelance/Ray/server/controllers/aws/rayLOGO.png",
          cid: "rayLOGO" //same cid value as in the html img src
        }
      ]
    },
    function(err, info) {
      if (err) console.log(err);
      else {
        console.log(info);
      }
    }
  );
};
module.exports = {
  emailRayOrder,
  emailDonation
};
