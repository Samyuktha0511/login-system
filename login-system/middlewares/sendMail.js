var nodemailer = require('nodemailer')
require('dotenv').config();

const sendMail = (email, id) => {
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAILEREMAIL,
            pass: process.env.MAILERPASSWORD
        }
    });

    let sender = "Samyuktha";
    var mailOptions = {
        from: sender,
        to: email,
        subject: "Email confirmation",
        html: `Press <a href=http://localhost:3000/verfiy/${id}> here </a> to verify your email`
    }

    Transport.sendMail(mailOptions, function(err, res) {
        if (err){
            console.log(err);
        }
        else{
            console.log("message sent");
        }
    })
}

module.exports = sendMail;