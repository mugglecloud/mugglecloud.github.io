const fs = require("fs");
const path = require("path");
const request = require("request");

const OssPath = path.resolve(__dirname, "..", "oss");

function getUrl(num) {
  return `http://feedmusic.com/images/frame-high/${num}.jpg`;
}

request("http://www.google.com", function (error, response, body) {});

function writeFile(url, outDir, outPath) {
  request(url, (error, response, body) => {
    if (error) {
      console.error(error.message);
      return;
    }

    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

    fs.mkdir(outDir, { recursive: true }, (err) => {
      if (err) console.error(err);

      fs.writeFileSync(outPath, body);
    });
  });
}

function download() {
  for (let i = 1; i < 180; i++) {
    const url = getUrl(i);
    const outPath = path.join(OssPath, url.replace("http://", ""));
    const outDir = path.dirname(outPath);

    fs.access(outPath, fs.constants.R_OK | fs.constants.W_OK, (accessErr) => {
      if (!accessErr) return;

      writeFile(url, outDir, outPath);
    });
  }
}

download();
