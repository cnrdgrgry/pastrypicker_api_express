const express = require("express");
const pastryRouter = express.Router();

//Import in and mount pastry routes

const pastryRoutes = require("./pastryRoutes");
pastryRouter.use("/pastries", pastryRoutes);

//exporting apiRouter
module.exports = pastryRouter;
