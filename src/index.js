const express = require("express");
const route = require("./routes");
const cors = require('cors');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(process.env.PORT);