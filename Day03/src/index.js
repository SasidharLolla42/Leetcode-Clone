const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const redisClient = require("./config/redis");

app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter);

const initializeConnection = async (req, res) => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is listening at port number: " + process.env.PORT);
    });
  } catch (err) {
    res.send("Erro: " + err);
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
