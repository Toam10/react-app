require("dotenv").config();
const express = require("express");

const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");

const app = express();
const userRouter = require("./routes/user.routes");

const publicPath = path.join(__dirname, "../client/build"); ///????
app.use(cors());
app.use(express.json());
app.use(express.static(publicPath)); ///???

/*app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
*/

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch {
  throw new Error("Couldn't connect to Mongo'");
}

app.use("/users", userRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is on port`);
});
