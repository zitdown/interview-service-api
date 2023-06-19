const db = require("../models");
const Interview = db.interviews;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }

  const interview = new Interview({
    title: req.body.title,
    description: req.body.description,
    status: 'To Do',
    hide: false,
    comments: [],
    created_by: req.headers['x-username'],
  });

  interview
    .save(interview)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interview."
      });
    });
};

exports.getInterviewList = (req, res) => {
  var condition = { hide : false};
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;

  Interview.find(condition).limit(limit).skip((page - 1) * limit)
    .then(data => {
      let result = data.map((r)=>{
        return {
          id:r.id,
          tital:r.title,
          description:r.description,
          status:r.status,
          created_by:r.created_by,
          created_at:r.created_at
        };
      })
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interview."
      });
    });
};

exports.getInterviewDetail = (req, res) => {
  const id = req.params.id;
  Interview.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Interview with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Interview with id=" + id });
    });
};

exports.updateStatus = (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  Interview.findByIdAndUpdate(id, {
    $set: req.body,
  }, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Interview with id=${id}. Maybe Interview was not found!`
        });
      } else res.send({ message: "Interview was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Interview with id=" + id
      });
    });
};

exports.hideInterview = (req, res) => {
  const id = req.params.id;

  Interview.findByIdAndUpdate(id, {
    $set: {hide: true},
  }, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Interview with id=${id}. Maybe Interview was not found!`
        });
      } else res.send({ message: "Interview was deleted successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Interview with id=" + id
      });
    });
};

exports.addComment = (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  let comment = req.body
  comment.created_at = new Date();
  comment.created_by = req.headers['x-username'];
  Interview.findByIdAndUpdate(id, {
    $push: {comments: comment},
  }, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Interview with id=${id}. Maybe Interview was not found!`
        });
      } else res.send({ message: "Interview was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Interview with id=" + id
      });
    });
};

