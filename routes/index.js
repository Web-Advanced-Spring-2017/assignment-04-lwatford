var express = require('express');
var router = express.router();
var nodemailer = require('nodemailer');
var sendgrid = require("sendgrid")("SENDGRID_APIKEY");

router.get('/', function(req, res){
	res.render('email', {title: 'contact'});
});

router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	  	user: 'watfl245@newschool.edu',
	  	pass: 'something'
	  }
	});
	var mailOptions = {
		from: 'latricia watford <latricia.watford@gmail.com>',
		to: 'watfl245@newschool.edu',
		subject: 'test',
		text: 'you have a new submission...Name ' + req.body.name + ' Email: ' +req.body.email + ' Message:' + req.body.message +,
		html: '<p> Thank you</p>'
	};
transporter.sendMail(mailOptions, function(error, info){
	if(error){
		console.log(error);
		res.redirect('/');
	} else {
		console.log('message sent:' + info.response);
		res.redirect('/');
	}
});
});

module.express = router;