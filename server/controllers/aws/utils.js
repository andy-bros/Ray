const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});
const getMessages = function(e) {
  return new Promise(function(r) {
    //
    //
    //This s3 call is getting all of the MESSAGES for each
    //course and returning them, once returned th messages
    // are stored on a messages key of that courses object
    //of line 49
    //
    //
    s3.listObjects({ Bucket: "raymp3s", Prefix: e }, function(err, tru) {
      if (err) console.error(err);
      if (tru) {
        r(tru.Contents);
      }
    });
  });
};

let messageSections = [];
let coursesSections = [];
const getMessageSermons = (req, res) => {
  if (req.query.section === "Courses" && coursesSections.length) {
    res.status(200).json(coursesSections);
    return;
  } else if (req.query.section === "Messages" && messageSections.length) {
    res.status(200).json(messageSections);
    return;
  }

  new Promise(resolve =>
    s3.listObjects(
      {
        Bucket: "raymp3s",
        Prefix: `${req.query.section}/`,
        Delimiter: "/"
      },
      function(err, res) {
        if (err) console.error(err);
        if (res) {
          // if (req.query.section === "Courses") {
          //   coursesSections = res.CommonPrefixes;
          // } else if (req.query.section === "Messages") {
          //   messageHolders = res.CommonPrefixes;
          // }

          resolve(res.CommonPrefixes);
        }
      }
    )
  ).then(results => {
    let newMessages = Promise.all(
      // (req.query.section === "Courses" ? coursesSections : messageSections)
      results.map(async e => {
        return { Title: e.Prefix, messages: await getMessages(e.Prefix) };
      })
    );
    newMessages
      .then(resultzz => {
        if (req.query.section === "Courses") {
          coursesSections = resultzz;
        } else if (req.query.section === "Messages") {
          messageSections = resultzz;
        }

        res.status(200).json(resultzz);
      })
      .catch(console.error);
  });
};

module.exports = {
  getMessageSermons
};
