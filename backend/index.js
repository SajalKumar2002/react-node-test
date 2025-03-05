require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const db = require("./config/db");
const apiRouter = require("./routes/index.Route.js");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(PORT, () => {
    db;
    console.log(`Server is running on Port ${PORT}`);
})