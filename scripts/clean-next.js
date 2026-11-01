const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", ".next");

function rm(target) {
  if (!fs.existsSync(target)) return;
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      fs.rmSync(target, {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 400,
      });
      return;
    } catch (err) {
      if (attempt === 7) throw err;
    }
  }
}

rm(dir);
console.log("Removed .next cache");
