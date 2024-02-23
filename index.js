const express = require("express");
const bodyParser = require("body-parser");
const translate = require("translate-google");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/translate", async (req, res) => {
  try {
    if (!req.body || !req.body.text) {
      return res
        .status(400)
        .json({ error: "Invalid request body. 'text' is missing." });
    }

    const englishText = req.body.text;

    const translatedText = await translate(englishText, { to: "fr" });

    res.status(200).json({ translation: translatedText });
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).json({ error: "An error occurred during translation. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
