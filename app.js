//https://www.npmjs.com/package/email-templates
//https://github.com/crocodilejs/node-email-templates/blob/master/examples/nodemailer/index.js
'use strict';
var EmailTemplate = require ('email-templates').EmailTemplate;
var nodemailer = require('nodemailer');
var path = require('path');

//path to template dir
var templateDir = path.resolve(__dirname,'templates');
var template = new EmailTemplate(path.join(templateDir,'testTemplate'));

var credentials = {
    service: 'gmail',
    auth: {
        //update email address and passwd below of sender
        user: 'xxxxxxx@gmail.com',
        pass: 'xxxxxxxxx'
    }
};

//creating transporter based to send mail
let transporter = nodemailer.createTransport(credentials);

//local variables to update the value in the page to rendered.
var locals = {
    item: {
        name: 'Apple',
        price: '120.0'
    },
    total: '120.0',
    date: '25/03/2017'
};

template.render(locals,function(err,results){
    if(err) return console.error(err);

     console.log(results.html.toString());
     console.log(results.text.toString());
    
    let mailOptions = {
    from: '"Sumit Test E-mail Nodejs 👻" <sumaltwork@gmail.com>', // sender address
    to: 'sumaltwork@gmail.com', // list of receivers
    subject : "Bill Test",
    html: results.html,
    text: results.text
};
    
    transporter.sendMail(mailOptions,function(err,responseStatus){
        if(err) return console.error(err);
        console.log(responseStatus);
    })
});

// setup email data with unicode symbols

// send mail with defined transport object
/*transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});*/