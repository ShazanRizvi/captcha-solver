const request = require("request");
const fs = require("fs");
const { createWorker } = require("tesseract.js");

const imageUrl = "https://i.ibb.co/jTKYQqP/Captcha-United.png";

// Download the image
request(imageUrl)
  .pipe(fs.createWriteStream("captcha.jpg"))
  .on("close", () => {
    // Extract text from the image
    const worker = createWorker({
      logger: (m) => console.log(m),
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize("captcha.jpg");
      console.log(text);
      await worker.terminate();
    })();
  });
