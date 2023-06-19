module.exports = app => {
  const dropdowns = require("../controllers/dropdown.controller.js");

  var router = require("express").Router();

  router.get("/status", dropdowns.getStatusList);

  app.use("/api/dropdowns", router);
};