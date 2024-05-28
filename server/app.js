const express = require("express");
const app = express();
const routes = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const connectDB = require("./DB/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("../public"));

app.use("/api/v1/tasks", routes);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("Connected to Db");
      app.listen(port, () => console.log(`Listening at port ${port}`));
    });
  } catch (error) {
    console.log(error);
  }
};

start();
