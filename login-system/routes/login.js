const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
//const mailer = require("../middleware/sendMail");
const { body, validationResult } = require('express-validator');

router.post('/',
  body('email').isEmail(),
  body('password').isLength({ min: 8}),
  async (req, res) => {
    const errors = validationResult(req);
      if(!errors.isEmpty()){
        console.log({errors: errors.array()});
        return res.status(400).json({ errors: errors.array()});
    }
    
    try {
        const { email, password } = req.body;
    
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
       
        const user = await User.findOne({ email });

        if(!user){
          res.status(400).send("User not found");
        }
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});

module.exports = router;