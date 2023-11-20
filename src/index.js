const express = require("express");
const app = express();
const route = require("./routes");
require("dotenv").config()

app.use(express.json());
app.use(route);
app.listen(process.env.PORT);