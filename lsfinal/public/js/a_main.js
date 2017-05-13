/* global firebase */
/* firebase database conection */

var noClick = 9;


var adopteeRef = firebase.database().ref('adoptees');
var nonAdopteeRef = firebase.database().ref('non-adoptees');
var agencyRef = firebase.database().ref('agency');

var container = $('div.container');
var obj = {};


$('#submit').click(function(e) {
	e.preventDefault();
	$(".overlay").addClass("active");
  $(".modal").addClass("active-modal");
	outputcontent();

})

function outputcontent() {
	// var registration = document.getElementById('input_registration').value;
	var name = document.getElementById('input_name').value;
	var member = document.getElementById('input_member').value;
	var birthNameday = document.getElementById('input_birthNameday').value;
	var sex = document.getElementById('input_sex').value;
	var nationality = document.getElementById('input_nationality').value;
	var birthName = document.getElementById('input_birthName').value;
	var hospitalBorn = document.getElementById('input_hospitalBorn').value;
	var state = document.getElementById('input_state').value;
	var country = document.getElementById('input_country').value;
	var maidenName = document.getElementById('input_maidenName').value;
	var birthNameFather = document.getElementById('input_birthNameFather').value;
	var email = document.getElementById('input_email').value;

	var item = {
		// registration: registration,
		name: name,
		member: member,
		birthNameday: birthNameday,
		sex: sex,
		nationality: nationality,
		birthName: birthName,
		hospitalBorn: hospitalBorn,
		state: state,
		country: country,
		maidenName: maidenName,
		birthNameFather: birthNameFather,
		email: email
	};
	// console.log('outputconent:');
	// console.log(item);

	// here we do something item
	// like store in the db
	// if (typeof item.name !== 'undefined' && item.name === ' ') {
	var newAdoptee = adopteeRef.child(item.name)
	newAdoptee.set(item)
		.then(function() {
			console.log('ADOPTEE SAVE succeeded');
		}).catch(function(error) {
			if (error) console.log('ADOPTEE SAVE failed');
		});
			// // Make GET request to show user that they have contributed to the database on each page and on main page
			// $('button#submit').click(function(e) {
			// $.getJSON('https://adopt-final.firebaseio.com/adoptees.json', function(data) {
			// 		$('sum').data.length);

			// var counter = 0;
			// counter("num " + counter);
			// counter ++;

			// console.log(counter);

			// function add() {
			// 	var counter = 0;
			// 	counter += 1;
			// }

			// var ref = new Firebase("https://adopt-final.firebaseio.com/adoptees.json");
			// ref.once("value", function(snapshot) {
		  // var a = snapshot.numChildren();
		  // // a === 1 ("name")
		  // var b = snapshot.child("name").numChildren();
		  // // b === 2 ("first", "last")
		  // var c = snapshot.child("name/first").numChildren();
		  // c === 0 (since "Fred" is a string)
// });


			// the line above counts the number of objects inside the JSON
		// })
		// .catch(function(error) {
		// 	if (error) console.log('ADOPTEE SAVE failed');
		// });

	// console.log(adopteeRef.numChildren())
	// newAdoptee.once('value', function(snapshot) {
	// 	console.log(snapshot.numChildren())
	// })

	// } else {
	// 	alert('Fill in the name!') // warning
	// }
}

//view info submited and then user clocks ok
$('button#database-btn').click(function(e){
  e.preventDefault();
  $.getJSON('/data/adoptee.json', function(data){
  	// $.getJSON('https://adopt-final.firebaseio.com/adoptees.json', function(data){
    console.log(data);
    $.each(data.database, function(i, a){
      $('ul').append('</li><br></br>Number ' + i +': '+ a["adoptee"] + '</li>' ); //ugh this only shows my objects
      
      console.log(i,a)
    });
  });
});


// //alt version of sum on mission page
// $('sum').click(function(e) {
// 	e.preventDefault();
// 	$.getJSON('https://adopt-final.firebaseio.com/adoptees.json', function(data) {
// 		console.log(data);
// 		$.each(data.database, function(i, a) {
// 			$('sum').append(length); // this only shows my objects

// 			console.log(i, a)
// 		});
// 	});
// });

//CLOSE DATA AFTER BUTTON IS CLOSED
// $('database-btn').click(function(){
//     $('database-btn').parents('.window').css('display','none');
// }); 


//non-adoptee
$('#submit').click(function(e) {
	e.preventDefault()
		$(".overlay").addClass("active");
  $(".modal").addClass("active-modal");
	outputcontent();
})

function outputcontent() {
	// var registration = document.getElementById('input_registration').value;
	var name = document.getElementById('input_name').value;
	var member = document.getElementById('input_member').value;
	var birthNameday = document.getElementById('input_birthNameday').value;
	var sex = document.getElementById('input_sex').value;
	var nationality = document.getElementById('input_nationality').value;
	var birthName = document.getElementById('input_birthName').value;
	var hospitalBorn = document.getElementById('input_hospitalBorn').value;
	var state = document.getElementById('input_state').value;
	var country = document.getElementById('input_country').value;
	var maidenName = document.getElementById('input_maidenName').value;
	var birthNameFather = document.getElementById('input_birthNameFather').value;
	var email = document.getElementById('input_email').value;

	var item = {
		// registration: registration,
		name: name,
		member: member,
		birthNameday: birthNameday,
		sex: sex,
		nationality: nationality,
		birthName: birthName,
		hospitalBorn: hospitalBorn,
		state: state,
		country: country,
		maidenName: maidenName,
		birthNameFather: birthNameFather,
		email: email
	};
	// console.log('outputconent:');
	// console.log(item);

	// here we do something item
	// like store in the db
	// if (typeof item.name !== 'undefined' && item.name === ' ') {
	var newAdoptee = nonAdopteeRef.child(item.name)
	newAdoptee.set(item)
		.then(function() {
			console.log('NON-ADOPTEE SAVE succeeded');
			// // Make GET request to 
			// $('button#database-btn').click(function(e) {
			// $.getJSON('https://adopt-final.firebaseio.com/adoptees.json', function(data) {
			// 		$('ul').append.length);

			// https://adopt-final.firebaseio.com/adoptees.json
			// Just count the number of objects inside the JSON
		})
		.catch(function(error) {
			if (error) console.log('NON-ADOPTEE failed');
		});
}

//AGENCY INFO

//non-adoptee
$('#submit').click(function(e) {
	e.preventDefault()
	$(".overlay").addClass("active");
  $(".modal").addClass("active-modal");
	// outputcontent();
})

function saveNonAdoptee() {
	// var registration = document.getElementById('input_registration').value;
	var name = document.getElementById('input_name').value;
	var member = document.getElementById('input_member').value;
	var birthNameday = document.getElementById('input_birthNameday').value;
	var sex = document.getElementById('input_sex').value;
	var nationality = document.getElementById('input_nationality').value;
	var birthName = document.getElementById('input_birthName').value;
	var hospitalBorn = document.getElementById('input_hospitalBorn').value;
	var state = document.getElementById('input_state').value;
	var country = document.getElementById('input_country').value;
	var maidenName = document.getElementById('input_maidenName').value;
	var birthNameFather = document.getElementById('input_birthNameFather').value;
	var email = document.getElementById('input_email').value;

	var item = {
		// registration: registration,
		name: name,
		member: member,
		birthNameday: birthNameday,
		sex: sex,
		nationality: nationality,
		birthName: birthName,
		hospitalBorn: hospitalBorn,
		state: state,
		country: country,
		maidenName: maidenName,
		birthNameFather: birthNameFather,
		email: email
	};
	// console.log('outputconent:');
	// console.log(item);

	// here we do something item
	// like store in the db
	// if (typeof item.name !== 'undefined' && item.name === ' ') {
	var newAdoptee = agencyRef.child(item.name)
	newAdoptee.set(item)
		.then(function() {
			console.log('NON-ADOPTEE SAVE succeeded');
			// // Make GET request to 
			// $('button#submit').click(function(e) {
			// $.getJSON('https://adopt-final.firebaseio.com/adoptees.json', function(data) {
			// 	$.each(data.database, function(i, a); 
			// 		$('ul').append.length);

			// https://adopt-final.firebaseio.com/adoptees.json
			// Just count the number of objects inside the JSON
		})
		.catch(function(error) {
			if (error) console.log('NON-ADOPTEE failed');
		});

	// console.log(adopteeRef.numChildren())
	// newAdoptee.once('value', function(snapshot) {
	// 	console.log(snapshot.numChildren())
	// })

	// } else {
	// 	alert('Fill in the name!') // warning
	// }
}

// $('button#database-btn').click(function(e) {
// 	e.preventDefault();
// 	$.getJSON('https://adopt-final.firebaseio.com/adoptees.json', function(data) {
// 		console.log(data);
// 		$.each(data.database, function(i, a) {
// 			$('ul').append('</li><br></br>Number ' + i + ': ' + a['adoptee'] + '</li>'); // this only shows my objects

// 			console.log(i, a)
// 		});
// 	});
// });

// // view info submited to database
// $('button#database-btn').click(function(e) {
// 	e.preventDefault();
// 	$.getJSON('https://adopt-final.firebaseio.com/adoptees.json', function(data) {
// 		// console.log(data);
// 		$.each(data.database, function(i, a) {
// 			$('ul').append('</li><br></br>Number ' + i + ': ' + a['adoptee'] + '</li>'); // this only shows my objects

// 			console.log(i, a)
// 		});
// 	});
// });


$("#close").click(function(){
  $(".overlay").removeClass("active");
  $(".modal").removeClass("active-modal");
});
