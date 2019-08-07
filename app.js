const nodemailer = require('nodemailer');
const csv = require('csvtojson/v1');
const schedule = require('node-schedule');
const template = require('./template.js');

//setting up nodemailer to send emails
const account = {
     user: '<your-google-mail-here>',
     pass: '<your-google-mail-password>'
}
var transporter = nodemailer.createTransport({
     pool: true, //keeps the server connection open
     host: 'smtp.gmail.com', //your email server
     port: 465, //gmail uses SSL
     secure: true, //gmail sends secure
     auth: {
          user: account.user,
          pass: account.pass
     }
});
//this list should contain columns which will act as key for the objects and so column names must be case senstive
var users = "./users.csv";
//keeping track of users to send and appending them from the csv file
var sendlist = [];
//keeping track of which user email to be sent
var count = 0;

function trigger_sending(user){ 
    //generates html email template
    var emailBody = template.generate(user).toString();
    //email-sending
    transporter.sendMail({
      	from: 'Sender Name<your-google-mail-here>',
      	to: user.email, //email address of our recipient
      	subject: '<Your-subject-here>',
      	text: '<plain-text-here>',
      	html: emailBody,
 	}, (error, info) => {
    	if (error) {
           return console.log(error);
        }
      	console.log('Email sent to : %s', info.accepted[0]);
      	if(count >= sendlist.length) {
      		 console.log("All emails have been sent in the list, you can shutdown the script using Ctrl+C");
      	}
 	});
}

function set_message_delays(){
  //scheduling our emails to be sent every 10 seconds so that the smpt server is not being overflooded and no email sending is discarded if you want to change seconds then replace 10 with any other number
     var message_job = schedule.scheduleJob('*/10 * * * * *', function(){
          trigger_sending(sendlist[count]);
          if(count < sendlist.length){
               count++;
          }
          if(count >= sendlist.length){
            message_job.cancel();
          }
    });
}

function get_list(){
     csv().fromFile(users)
     .on('json', (jsonObj) => {
          sendlist.push(jsonObj);
     })
     .on('done', () => {
         set_message_delays();
     })
}

transporter.verify(function(error, success) {
     if (error) {
          console.log(error);
     } else {
          console.log('Server is ready to send our emails');
          get_list();
     }
});