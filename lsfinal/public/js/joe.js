/* global firebase */
/* firebase database conection */

var adopteeRef = firebase.database().ref('adoptees');
var nonAdopteeRef = firebase.database().ref('non-adoptees');
var agencyRef = firebase.database().ref('agency');

var container = $('div.container');
var obj = {};

//sending and recieving ids
var sID = '';
var rID = '';
// var ref = firebase.database().ref("cUsers"); 
var chatUsers=sID+"_"+rID;


// var rootRef = firebase.database.ref();
// var usersRef = rootRef.child("users");

//query name comparison
adopteeRef.orderByChild("name").equalTo(25).on("child_added", function(snapshot) {
  console.log(snapshot.key);
});

// query against adoptee info
// adopteeRef.isEqual(nonAdopteeRef.child("users"));  // true
// nonAdopteeRef.isEqual(adopteeRef.child("users"));  // true

// adopteeRef.isEqual(agencyRef.child("users"));  // false
// agencyRef.parent.isEqual(adopteeRef.child("users"));  // true

const messaging = firebase.messaging();
  messaging.requestPermission()
  .then(function(){
    console.log('Have permission');
    return messaging.getToken();
  })
  .then(function(token){
  	console.log(token);
  })
  .catch(function(err) {
    console.log('error');
})

messaging.onMessage(function(payload) {
	console.log('onMessage:', payload);
});

$('#submit').click(function(e) {
	e.preventDefault();
	$(".overlay").addClass("active");
  $(".modal").addClass("active-modal");
})

//email based on query
// adopteeRef.orderByChild("email").equalTo(senderEmail).on("child_added", function (snapshot){
//     sID = snapshot.val().uid;
//     alert(sID);
// });
// adopteeRef.orderByChild("email").equalTo(email).on("child_added", function (snapshot) {
//     rID = snapshot.val().uid;
//     alert(rID);
// });

function saveAdoptee() {
	console.log('>>> starting up saveAdoptee');
	// var registration = document.getElementById('input_registration').value;
	var name = document.getElementById('input_name').value;
	var member = document.getElementById('input_member').value;
	var birthday = document.getElementById('input_birthday').value;
	var sex = document.getElementById('input_sex').value;
	var nationality = document.getElementById('input_nationality').value;
	var birth = document.getElementById('input_birth').value;
	var hospitalBorn = document.getElementById('input_hospitalBorn').value;
	var state = document.getElementById('input_state').value;
	var country = document.getElementById('input_country').value;
	var maidenName = document.getElementById('input_maidenName').value;
	var birthFather = document.getElementById('input_birthFather').value;
	var birthmark = document.getElementById('input_birthmark').value;
	var email = document.getElementById('input_email').value;


	var item = {
		// registration: registration,
		name: name,
		member: member,
		birthday: birthday,
		sex: sex,
		nationality: nationality,
		birth: birth,
		hospitalBorn: hospitalBorn,
		state: state,
		country: country,
		maidenName: maidenName,
		birthFather: birthFather,
		birthmark: birthmark,
		email: email
	};

	adopteeRef.orderByChild("name").equalTo(item.name).once("value", function(snapshot) {
  	console.log("query result:", snapshot.numChildren());
  	console.log(snapshot.val());

  	if(snapshot.val()){
  		console.log(">>> ADOPTEE FOUND, sending email...");
  		var r = confirm("we found someone with your name!")
			if (r == true) {
			    txt = "You pressed OK!";
			    checkNonAdopteesForAdoptee(item.name);
			} else {
			    txt = "You pressed Cancel!";
			}
  		//send email...
  	} else {
  		console.log("no adoptee found, saving now...");
	  	adopteeRef.push().set(item)
			.then(function() {
				console.log('ADOPTEE SAVE succeeded');
			}).catch(function(error) {
				if (error) console.log('ADOPTEE SAVE failed');
			});
  	}
	});

}

// /counter for users to each page
//snapshot is the adopteeRef
adopteeRef.once("value", function(snapshot) {
	console.log("pre snap is" + snapshot);
  var a = snapshot.numChildren();
  var snapshot = 	document.getElementById('snapshot');	
	var counter = document.getElementById('counter');
	console.log("adoptees:", a);
	$('#counter').html(a);
});

// nonAdopteeRef.orderByChild("email").equalTo(senderEmail).on("child_added", function (snapshot){
//     sID = snapshot.val().uid;
//     alert(sID);
// });
// nonAdopteeRef.orderByChild("email").equalTo(email).on("child_added", function (snapshot) {
//     rID = snapshot.val().uid;
//     alert(rID);
// });

function saveNonAdoptee() {
	// var registration = document.getElementById('input_registration').value;
	var name = document.getElementById('input_name').value;
	var yourName = document.getElementById('input_your_name').value;
	var yourState = document.getElementById('input_your_state').value;
	var member = document.getElementById('input_member').value;
	var birthday = document.getElementById('input_birthday').value;
	var sex = document.getElementById('input_sex').value;
	var nationality = document.getElementById('input_nationality').value;
	var birth = document.getElementById('input_birth').value;
	var hospitalBorn = document.getElementById('input_hospitalBorn').value;
	var state = document.getElementById('input_state').value;
	var country = document.getElementById('input_country').value;
	var maidenName = document.getElementById('input_maidenName').value;
	var birthFather = document.getElementById('input_birthFather').value;
	var email = document.getElementById('input_email').value;

	var item = {
		// registration: registration,
		name: name,
		yourName: yourName,
		yourState: yourState,
		member: member,
		birthday: birthday,
		sex: sex,
		nationality: nationality,
		birth: birth,
		hospitalBorn: hospitalBorn,
		state: state,
		country: country,
		maidenName: maidenName,
		birthFather: birthFather,
		email: email
	};
	
	nonAdopteeRef.push().set(item)
		.then(function() {
			console.log('NON-ADOPTEE SAVE succeeded');
		})
		.catch(function(error) {
			if (error) console.log('NON-ADOPTEE failed');
		});
}

nonAdopteeRef.once("value", function(snapshot) {
  var a = snapshot.numChildren();
	console.log("nonAdopteeRef:", a);
	  var a = snapshot.numChildren();

	//adoptees is the information I want to know 
	var snapshot = 	document.getElementById('snapshot');	
	var countera = document.getElementById('countera');
	// console.log("nonAdopteeRef:", a);
	$('#countera').html(a);
});



$("#close").click(function(){
  $(".overlay").removeClass("active");
  $(".modal").removeClass("active-modal");
});


function saveAgency() {
	// var registration = document.getElementById('input_registration').value;
	var yourName = document.getElementById('input_your_name').value;
	var agencyName = document.getElementById('input_agency_name').value;
	var agencyState = document.getElementById('input_agency_state').value;
	var name = document.getElementById('input_name').value;
	var member = document.getElementById('input_member').value;
	var birthday = document.getElementById('input_birthday').value;
	var sex = document.getElementById('input_sex').value;
	var nationality = document.getElementById('input_nationality').value;
	var birth = document.getElementById('input_birth').value;
	var hospitalBorn = document.getElementById('input_hospitalBorn').value;
	var state = document.getElementById('input_state').value;
	var country = document.getElementById('input_country').value;
	var maidenName = document.getElementById('input_maidenName').value;
	var birthFather = document.getElementById('input_birthFather').value;
	var email = document.getElementById('input_email').value;

	var item = {
		// registration: registration,
		yourName: yourName,
		agencyName: agencyName,
		agencyState: agencyState,
		name: name,
		member: member,
		birthday: birthday,
		sex: sex,
		nationality: nationality,
		birth: birth,
		hospitalBorn: hospitalBorn,
		state: state,
		country: country,
		maidenName: maidenName,
		birthFather: birthFather,
		email: email
	};

	// var newAdoptee = agencyRef.child(item.name)
	agencyRef.push().set(item)
	// timestamp.date.now();
		.then(function() {
			console.log('SAVE AGENCY succeeded');
		})
		.catch(function(error) {
			if (error) console.log('SAVE AGENCY failed');
		});
}

agencyRef.once("value", function(snapshot) {
  var a = snapshot.numChildren();
	console.log("agency:", a);
  var a = snapshot.numChildren();
	//adoptees is the information I want to know 
	var snapshot = 	document.getElementById('snapshot');	
	var counterb = document.getElementById('counterb');
	// console.log("agencyRef:", a);
	$('#counterb').html(a);
});




function checkNonAdopteesForAdoptee(adoptee){
	console.log('check for "birthname" in nonadoptees now...');
	// console.log(adoptee.key);

	nonAdopteeRef.orderByChild("birth").equalTo(adoptee).once("value", function(snapshot) {
		console.log("nonadoptee query result:", snapshot.numChildren());
  	console.log(snapshot.val());
  	console.log(adoptee);

  	if(snapshot.val()){
  		console.log('sending email...');
			$.ajax({
			  type: 'POST',
			  url: "/sendemail",
				data: JSON.stringify(snapshot.val()),
				contentType: 'application/json',
			}).done(function( msg ) {
		    alert( "Data Saved: " + msg );
			});

  	} else {
  		console.log('no nonadoptee match found.');
  	}
	});
}


