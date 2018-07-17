const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.accessKeyId
});

var allKeys = [];
function listAllKeys(token, cb) {
  var opts = {
    Bucket: "raymp3s",
    MaxKeys: 100
  };
  if (token) opts.ContinuationToken = token;

  s3.listObjects(opts, function(err, data) {
    console.log("DATA: ", data);
    if (err) return console.log(err);
    allKeys = data.Contents.map(
      val => `https://s3.amazonaws.com/raymp3s/${val.Key}`
    );
    console.log(allKeys);

    // if (data.IsTruncated) listAllKeys(data.NextContinuationToken, cb);
    // else cb();
  });
}
const getAWS = (req, res) => {
  listAllKeys();
  console.log("get aws is validated and good to go");
};
module.exports = {
  getAWS
};
