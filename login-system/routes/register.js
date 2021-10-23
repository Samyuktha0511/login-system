const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
//const mailer = require("../middleware/sendMail");
const { body, validationResult } = require('express-validator');


router.post('/',
  body('email').isEmail().custom(value => {
    return User.findOne({email: value}).then(user => {
      if(user) {
        return Promise.reject('Email exists already');
      }
    });
  }),
  body('password').isLength({ min: 8}),
  body('confirm_password').customSanitizer((value, {req}) =>{
      if( value !== req.body.password){
          throw new Error('Passwords do not match');
      }
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log({errors: errors.array()});
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        const { first_name, last_name, email, mobile, password, confirm_password, city, state, country, isValid } = req.body;

    if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
    }


    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), 
      mobile,
      password: encryptedPassword,
      city,
      state, 
      country,
      isValid,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
   
    user.token = token;
    user.save()
    //sendEmail(email)
    //sendMail(email, _id)
    //mailer.sendEmail(email)
    
    res.status(201).json(user);
    res.redirect('back');
    
  } catch (err) {
    console.log(err);
  }

});

router.get('/verify/:id', async (req, res) =>{
  const { id } = req.params.id;

  const user = await User.findOne({ id: id});
  if (user) {
    user.isValid = true;
    await user.save();

    res.redirect('/profile');
  }
  
})

module.exports = router;
