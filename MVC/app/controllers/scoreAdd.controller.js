const Player = require("../models/player.model.js");


exports.findLeaderBoardSubject = (req, res) => {
  Player.findBySubject(req.params.subject ,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Players with subject ${req.params.subject}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Players with Subject " + req.params.subject
        });
      }
    } else res.send(data);
  });
};