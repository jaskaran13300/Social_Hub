
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'socialhub13300@gmail.com',
        pass: '**Batra13300**'
    }
});

function sendMailto (_to,_subject,_text,cb){
    var mailOptions = {
        from: 'socialhub13300@gmail.com',
        to: _to,
        subject: _subject,
        html:"<h1>"+ _text+"</h1>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            cb({"error":error})
        } else {
            console.log('Email sent: ' + info.response);
            cb({"response":info.response})
        }
    })
}

module.exports=sendMailto;