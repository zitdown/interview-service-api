const db = require("../models");
const Dropdown = db.dropdowns;

exports.getStatusList = (req, res) => {
  var condition = {
    $and: [
        { name: 'status'},
        { active: true }
    ]
  };

  Dropdown.find(condition)
    .then(data => {
      res.send(data.map((r)=>{
        return r.value
      }));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
