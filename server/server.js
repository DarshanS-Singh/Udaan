const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/Routes.js")

const PORT = process.env.PORT || 4000;
const route = express();

const corsOptions = {
  origin: "http://localhost:4500",
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

route.use(cors(corsOptions));
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(cookieParser());

route.use('/', routes);

route.listen(PORT, () => console.log(`Server running on port ${PORT}`));
