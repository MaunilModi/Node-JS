const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(filename, `${Date.now()} : ${req.method}`, (err, result) => {
      next();
    });
  };
}

module.exports = { logReqRes };
