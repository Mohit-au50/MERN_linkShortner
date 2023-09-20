require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Link = require("./models/linkModel");
const app = express();

// middeleware
app.use(express.json());
app.use(
  cors({
    origin: "https://link-shortner-omega.vercel.app/",
  })
);

// sample route to  check the server
app.get("/", (req, res) => {
  res.json({
    name: "test",
    message: "Server is running fine",
  });
});

// post route to convert the link
app.post("/generate-link", async (req, res) => {
  try {
    const { link } = req.body;

    const domain = "https://link-shortner-omega.vercel.app/";

    const newLink = new Link({
      originalLink: link,
      domain: domain,
    });
    await newLink.save();
    console.log(newLink);

    res.status(224).json({
      shortLink: `${newLink.domain}${newLink.linkAlias}`,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      name: "Post /generate-link error",
      message: "Error creting documnet",
    });
  }
});

// get route to find the document and redirect the user
app.get("/:alias", async (req, res) => {
  try {
    const { alias } = req.params;

    // find the link document with alias keyword
    const foundDoc = await Link.findOne({ linkAlias: alias });
    if (!foundDoc) {
      console.error("Documnet not found");
      res.status(404).json({
        name: "Mongoose Error",
        message: "Error finding document",
      });
      return;
    }

    res.status(301).redirect(foundDoc.originalLink);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      name: "Redirection Error",
      message: "Eroor redirecting user",
    });
  }
});

// connect the database first then listen to the app on port
const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, console.log(`server is live http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));
