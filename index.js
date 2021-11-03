require('dotenv').config()

const { fromPath } = require("pdf2pic")
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

async function ocr(filePath) {
  try {
    const response = await client.textDetection(filePath)
    const [result] = response
    const { text } = result.fullTextAnnotation
    return text 
  } catch (err) {
    console.error('Error: ', err)
  }
}

function convertPdf(filePath) {
  const options = {
    density: 100,
    saveFilename: "untitled",
    savePath: "./images",
    format: "png",
    width: 1024,
    height: 768
  };

  fromPath(filePath, options).bulk(-1).then((resolve) => {
    console.log(resolve)

    return resolve;
  });
}

async function run() {
  for(let i = 1; i <= 109; i++) {
    await ocr(`./images/untitled.${i}.png`).then(text => {
      console.log("------------------> Page " + i)
      console.log(text)
    })
  }
}


run()