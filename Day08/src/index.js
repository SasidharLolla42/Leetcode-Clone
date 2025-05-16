const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const redisClient = require("./config/redis");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");

app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter);
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);

const initializeConnection = async (req, res) => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is listening at port number: " + process.env.PORT);
    });
  } catch (err) {
    res.send("Error: " + err);
  }
};

initializeConnection();

// main()
//   .then(async () => {
//     app.listen(process.env.PORT, () => {
//       console.log("Server is listening at port number: " + process.env.PORT);
//     });
//   })
//   .catch((err) => console.log("Error Occurred:" + err));
