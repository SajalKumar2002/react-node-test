const { Router } = require("express");

const apiRouter = Router();

const {
    getData,
    insertData,
    updateData,
    deleteData,
    login,
    register
} = require("../controllers/index.Controller.js")

const {
    getAccessToRoute
} = require("../middleware/authentication.js")

// const upload = require("../config/mutler.js");

apiRouter //(Combined both the data routes and auth Routes)
    // API Test
    .get("/", (req, res) => {
        res.send("Hello World");
    })
    // Authentication Routes(Must be in different files like auth.Routes.js)
    .post("/login", login)
    .post("/register", register)
    // Data Routes
    .use(getAccessToRoute)
    .get("/data/:page", getData)
    .patch("/data/:id", updateData)
    .delete("/data/:id", deleteData)

module.exports = apiRouter;