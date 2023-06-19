module.exports = app => {
  const interviews = require("../controllers/interview.controller.js");

  var router = require("express").Router();

  router.post("/", interviews.create);

  router.get("/", interviews.getInterviewList);

  router.get("/:id", interviews.getInterviewDetail);

  router.patch("/:id/status", interviews.updateStatus);

  router.post("/:id/comment", interviews.addComment);

  router.delete("/:id", interviews.hideInterview);

  app.use("/api/interviews", router);
};
