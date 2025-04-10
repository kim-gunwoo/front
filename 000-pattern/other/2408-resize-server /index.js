const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sharp = require('sharp');
const mime = require('mime-types');
const multer = require('multer');

// Multer 설정
const storage = multer.memoryStorage(); // 메모리 저장소를 사용하여 파일을 메모리에 저장
const upload = multer({ storage: storage });

// 이미지 리사이징 라우트
app.post('/resize', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    console.log(mime.extension(req.file.mimetype))
    console.log(req.file.mimetype)

    const { w, h } = req.body;

    // 이미지 리사이징
    // const resizedImage = await sharp(req.file.buffer)
    //   .resize(parseInt(w), parseInt(h))
    //   .toBuffer();
    const image = await sharp(req.file.buffer);
    // const resizedImage = await image.metadata().then(meta => {
    //   return image
    //     .resize(Math.round(meta.width / 2))
    //     .toBuffer();
    // });
    const resizedImage = await image.resize(parseInt(w))
      .toBuffer();

    // 리사이즈된 이미지 전송
    res.set('Content-Type', req.file.mimetype);
    res.send(resizedImage);
  } catch (error) {
    res.status(500).send('Error processing image.');
  }
});

// app.get('/', async (req, res) => {
//  try {
//   resizedImage = await Sharp(s3Object.Body)
//    .resize(width, height)
//    .toFormat(format, {
//     quality
//    })
//    .toBuffer();


//  } catch (error) {
//   console.log('Sharp: ', error);
//   return callback(error);
//  }
// })

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});