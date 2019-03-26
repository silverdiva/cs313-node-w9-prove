var express = require("express");

var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");
app.set('views', __dirname + "/views");
app.set('public', __dirname + '/public');
app.set("pages", __dirname + "pages");

app.get("/", function (req, res) {
	//console.log("Received a request for /");

	//res.write("This is the root.");
	//res.end();

	res.render("pages/index");
});

app.get("/home", function (req, res) {
	// Controller
	console.log("Received a request for the home page");
	var name = getCurrentLoggedInUserAccount();
	var emailAddress = "kimberly@email.com";

	var params = {
		username: name,
		email: emailAddress
	};

	res.render("home", params);
});


app.get("pages", function (req, res) {
		//__dirname + "views/pages");
		
	res.render("views/pages/form.ejs");
}
		
		
app.get("/getRate", function(request, response) {
  	var result = calculateRate(req, res);
  	
	response.render("pages/results.ejs", result);

});

app.listen(5000, function () {
	console.log("The server is up and listening on port 5000");
});

// Model

function getCurrentLoggedInUserAccount() {
	// access the database
	// make sure they have permission to be on the site

	return "Kimberly";
}

//calculates the U.S. postal rate for package mailing
app.get("/getRate", function (req, res) {
	var result = calculateRate();
	response.render('pages/results.ejs', result);
});

function calculateRate(req, res) {
	var weight = request.query.weight;
	var postalType = request.query.postalType;
	var cost = 0.00;
	console.log("Weight: " + weight + "(oz.), " + "Shipping Type: " + postalType);

	switch (postalType) {
		case "Stamped":
			if (weight <= 1) {
				cost = 0.55;
			} else if (weight <= 2) {
				cost = 0.70;
			} else if (weight <= 3) {
				cost = 0.85;
			} else if (weight <= 3.5) {
				cost = 1.0;
			} else {
				console.log("There is a weight limit of 3.5oz for First Class stampled-letter mailing. Your selection is too heavy for sending a First Class stamped letter via U.S.P.S.");
			}
			break;
		case "Metered":
			if (weight <= 1) {
				cost = 0.50;
			} else if (weight <= 2) {
				cost = 0.65;
			} else if (weight <= 3) {
				cost = 0.80;
			} else if (weight <= 3.5) {
				cost = .95;
			} else {
				console.log("There is a weight limit of 3.5oz for First Class metered mailing. Your selection is too heavy for sending a First Class metered-mail letter via  U.S.P.S.");
			}
			break;
		case "Envelope":
			if (weight <= 1) {
				cost = 1.0;
			} else if (weight <= 2) {
				cost = 1.15;
			} else if (weight <= 3) {
				cost = 1.3;
			} else if (weight <= 4) {
				cost = 1.45;
			} else if (weight <= 5) {
				cost = 1.60;
			} else if (weight <= 6) {
				cost = 1.75;
			} else if (weight <= 7) {
				cost = 1.90;
			} else if (weight <= 8) {
				cost = 2.05;
			} else if (weight <= 9) {
				cost = 2.20;
			} else if (weight <= 10) {
				cost = 2.35;
			} else if (weight <= 11) {
				cost = 2.50;
			} else if (weight <= 12) {
				cost = 2.65;
			} else if (weight <= 13) {
				cost = 2.80;
			} else {
				console.log("There is a weight limit of 13oz for First Class large envelope mailing. Your selection is too heavy for sending a First Class large-envelope via  U.S.P.S mail.");
			}
			break;
		case "Parcel":
			if (weight <= 1) {
				cost = 3.66;
			} else if (weight <= 2) {
				cost = 3.66;
			} else if (weight <= 3) {
				cost = 3.66;
			} else if (weight <= 4) {
				cost = 3.66;
			} else if (weight <= 5) {
				cost = 4.39;
			} else if (weight <= 6) {
				cost = 4.39;
			} else if (weight <= 7) {
				cost = 4.39;
			} else if (weight <= 8) {
				cost = 4.39;
			} else if (weight <= 9) {
				cost = 5.19;
			} else if (weight <= 10) {
				cost = 5.19;
			} else if (weight <= 11) {
				cost = 5.19;
			} else if (weight <= 12) {
				cost = 5.19;
			} else if (weight <= 13) {
				cost = 5.71;
			} else {
				console.log("There is a weight limit of 13oz for First Class parcel mailing. Your selection is too heavy for sending a First Class parcel via U.S.P.S.");
			}
			break;
		default:
			console.log("Error: Please select an option, your input was empty");
	}

	return {
		weight: weight,
		postalType: postalType,
		cost: cost.toFixed(2)
	};
}
