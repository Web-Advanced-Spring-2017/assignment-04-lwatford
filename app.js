var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var mongo = require('mongodb');
var io = require('socket.io')(server);
var fs = require('fs');

// var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyparser.urlencoded({
//   extended:true
// }));

// // to page
// // app.get('/public/home', function(req, res){

// app.get('/', function(req, res){
//   res.sendfile('adoptee.html');
//   console.log('nodemailer in console log' + req.url);

// });

// //sending mail function
// app.post('/send', function(req, res){
//   if(req.body.mail == "" || req.body.subject = ""){
//     res.send('error:email!');
//     return false;
//   }

//       //sending email with SMTP using SMTP settings
//       var smtpTransport = nodemailer.createTransport('SMTP', {
//           host: "smtp.gmail.com", //hostname
//           secureConnection: true, // use ssl
//           port: 465, //port for secure SMTP
//             auth: {
//               user: '', 
//               pass: ''
//             }
//       });
//       var mailOptions = {
//           from: 'latricia watford <latricia.watford@gmail.com>',
//           to: req.body.email, // list of recievers
//           subject: req.body.subject + " - ", //subject line
//           text: 'you have a new submission...Name' + req.body.email + ' Email:' +req.body.name + 'Message:' + req.body.message +,
//           html: '<p> Thank you</p>'
//         }
//         smtpTransport.SendMail(mailOptions, function(error, response){
//             if(error){
//               res.send("bummer..not working " + error);
//             }else{
//               res.send("yes itsworking ");

//           }
//         });
//    });

//close the server
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




var socket = require('socket.io');
var port = 8080;

server.listen(port);
var connections = [];

console.log('Socket server is running on port', port);

app.use(express.static('public')); //host public directory


io.on('connection', newConnection); //event for new connection (hey im connected, i see you, goodbye)

function newConnection(socket) {
	var conLen = connections.length;
	console.log('new connection: ' + socket.id);
	socket.emit('open', {hello:'world'});
	connections.push(socket);

	io.sockets.emit('getConnection', {connectionLength: conLen});

	console.log("the current connections are:" + connections.length);;

	socket.on('theMouseWasPressed', handleMousePress);
	broadcast(conLen);

}

function confirmData(data) {
	console.log(data);
}

function handleMousePress(data) {
	console.log(data);
}


function broadcast (data) {
	for (item in connections) {
		connections[item].send(data);
	}
}


// var mailer = nodemailer.createTransport({
//   host:'smtp.mail.org',
//   port: 465,
//   secure:true,
//   auth:{
//     user: '',
//     pass: ''
//   } 
// })

// mailer. use('compile', hsb({
//   viewPath:'views/email',
//   extName:'.hbs'
// }));


//sending email
app.post('/sendemail', function(req, res, next){

  // mailer.sendMail({
  //   from: 'latricia.watford@gmail',
  //   to:'watfl245@newschool.edu',
  //   subject:'Thank you'

  // });
  console.log('sending email now!');
  // console.log(req);
  console.log('body: ' + JSON.stringify(req.body));
  res.send('sent');
});

 // GET home page. 
app.get('/', function(req, res, next) {
  res.render('adoptee.html');
});
 ////
app.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('adoptee.html', {items: resultArray});
    });
  });
});

app.post('/insert', function(req, res, next) {
  var item = {
    registration: req.body.registration,
    adoptee_name: req.body.adoptee_name,
    brithfamily_member: req.body.brithfamily_member,
    date_of_birth: req.body.date_of_birth,
    sex: req.body.sex,
    nationality: req.body.nationality,
    adoptee_name_at_birth: req.body.adoptee_name_at_birth,
    hospital_born: req.body.hospital_born,
    state: req.body.state,
    county: req.body.county,
    birth_mother_maiden_name: req.body.birth_mother_maiden_name,
    birth_father_name: req.body.birth_father_name,
    email: req.body.email
  };
      console.log('Item inserted');

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});
////

app.post('/update', function(req, res, next) {
  var item = {
    registration: req.body.registration,
    adoptee_name: req.body.adoptee_name,
    brithfamily_member: req.body.brithfamily_member,
    date_of_birth: req.body.date_of_birth,
    sex: req.body.sex,
    nationality: req.body.nationality,
    adoptee_name_at_birth: req.body.adoptee_name_at_birth,
    hospital_born: req.body.hospital_born,
    state: req.body.state,
    county: req.body.county,
    birth_mother_maiden_name: req.body.birth_mother_maiden_name,
    birth_father_name: req.body.birth_father_name,
    email: req.body.email,
    number: req.body.number

  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

function goDoSomething(d){
    alert(d.getAttribute("modal"));
}

app.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = app;


