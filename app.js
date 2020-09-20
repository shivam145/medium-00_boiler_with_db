import express from "express";
import bodyParser from "body-parser";
import user from "./routes/user";
import { MongoClient } from "mongodb";
import { clientApiKeyValidation } from "./common/authUtils";

const CONN_URL = "mongodb://localhost:27017";
let mongoClient = null;

let app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// app.use(clientApiKeyValidation);

app.get("/", (req, res, next) => {
  res.status(200).send({
    status: true,
    response: "Hello World!",
  });
});

app.use("/user", user);

app.use((req, res, next) => {
  if (!res.data) {
    return res.status(404).send({
      status: false,
      error: {
        reason: "Invalid Endpoint",
        code: 404,
      },
    });
  }

  res.status(res.statusCode || 200).send({ status: true, response: res.data });
});

app.listen(30006, () => {
  console.log(" ********** : running on 30006");
});

process.on("exit", (code) => {
  nodemon.emit("quit");
  console.log(`About to exit with code: ${code}`);
});

process.on("SIGINT", function () {
  nodemon.emit("quit");
  console.log("Caught interrupt signal");
  process.exit();
});

module.exports = app;
