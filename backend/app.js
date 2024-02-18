require("dotenv").config();
const express = require("express");
const connectdb = require("./config/db");
const app = express();
const cors = require("cors");

connectdb();
const transactroute = require("./router/route");
const PORT = 3001;
app.use(cors());

app.use("/", transactroute);
app.listen(PORT, function () {
  console.log(`Server running at PORT ${PORT}`);
});
