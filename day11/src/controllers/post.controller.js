require("dotenv").config();
const postModel = require("../models/post.models");
const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const postController = async (req, res) => {
  try {
    console.log(req.body, req.file);

    const response = await client.files.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      data: response,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
};


module.exports = postController;
