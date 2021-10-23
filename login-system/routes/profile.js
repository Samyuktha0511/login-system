const router = require('express').Router();
let User = require('../models/userModel');
const auth = require("../middlewares/auth");

router.route('/:id').get(auth,(req, res) => {
    User.findById(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
  