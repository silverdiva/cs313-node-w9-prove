var express = require("express");
var app = express();
var url = require('url');

app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("public", __dirname + "/public");
app.set("views", "views");
app.set("views", __dirname + "/views");



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
});



//calculates rates based on uder input
app.get("/getRate", function (req, res) {
	handleRate(req, res);
});


//calculates the U.S. postal rate for package mailing
function handleRate(req, res) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	var mailType = requestUrl.query.mailType;
	var weight = Number(requestUrl.query.weight);

	lookupRate(response, mailType, weight);
}

	

function lookupRate(response, mailType, weight) {
	mailType = mailType.toLowerCase();

	var result = 0;

	if (mailType == "stamped" && weight <= 3.5) {
		if (weight <= 1) {
			result = 0.49;
		} else if (weight <= 2) {
			result = 0.7;
		} else if (weight <= 3) {
			result = 0.91;
		} else {
			result = 1.12;
		}
	} else if (mailType == "metered" && weight <= 3.5) {
		if (weight <= 1) {
			result = 0.46;
		} else if (weight <= 2) {
			result = 0.67;
		} else if (weight <= 3) {
			result = 0.88;
		} else {
			result = 1.09;
		}		
	} else if (mailType == "package") {
		if (weight <= 4) {
			result = 3;
		} else if (weight <= 5) {
			result = 3.16;
		} else if (weight <= 6) {
			result = 3.32;
		} else if (weight <= 7) {
			result = 3.48;
		} else if (weight <= 8) {
			result = 3.64;
		} else if (weight <= 9) {
			result = 3.80;
		} else if (weight <= 10) {
			result = 3.96;
		} else if (weight <= 11) {
			result = 4.19;
		} else if (weight <= 12) {
			result = 4.36;
		} else if (weight <= 13) {
			result = 4.53;
		}
	} else if (mailType == "large" || weight > 3.5) {
		if (weight <= 1) {
			result = 0.98;
		} else if (weight <= 2) {
			result = 1.19;
		} else if (weight <= 3) {
			result = 1.4;
		} else if (weight <= 4) {
			result = 1.61;
		} else if (weight <= 5) {
			result = 1.82;
		} else if (weight <= 6) {
			result = 2.03;
		} else if (weight <= 7) {
			result = 2.24;
		} else if (weight <= 8) {
			result = 2.45;
		} else if (weight <= 9) {
			result = 2.66;
		} else if (weight <= 10) {
			result = 2.87;
		} else if (weight <= 11) {
			result = 3.08;
		} else if (weight <= 12) {
			result = 3.29;
		} else if (weight <= 13) {
			result = 3.5;
		}
	} else {
		// Something unexpected happened
		result = 200;
	}

	var params = {mailType: mailType, weight: weight, result: result};

	response.render('pages/result', params);







//could not get this to work, not sure why yet. need to dig further

	//calculates the U.S. postal rate for package mailing
		//app.get("/getRate", function (req, res) {
		//var result = calculateRate()
		//response.render("pages/results.ejs", result);
		//});



/*function calculateRate(req, res) {
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
*/