const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(require("cors")());

const productrouter = require("./Router/productrouter");
const userrouter = require("./Router/userrouter");


const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", userrouter);
app.use("/api/products", productrouter);

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err.message));
