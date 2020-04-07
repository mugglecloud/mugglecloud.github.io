const fs = require("fs");
const path = require("path");
const request = require("request");

const OssPath = path.resolve(__dirname, "..", "oss");

function getUrl(num) {
  return `http://feedmusic.com/images/frame-high/${num}.jpg`;
}

function writeFile(uri, filename) {
  return new Promise((resolve, reject) => {
    request(uri)
      .on("error", reject)
      .pipe(fs.createWriteStream(filename))
      .on("finish", () => {
        console.log("write file", filename, "success");
        resolve();
      });
  });
}

function download() {
  let promises = [];
  for (let i = 1; i < 180; i++) {
    const url = getUrl(i);
    const outPath = path.join(OssPath, url.replace("http://", ""));

    fs.access(outPath, fs.constants.R_OK | fs.constants.W_OK, (accessErr) => {
      if (!accessErr) return;

      promises.push(writeFile(url, outPath));
    });

    // promises.push(writeFile(url, outPath));
  }

  Promise.all(promises);
}

download();
