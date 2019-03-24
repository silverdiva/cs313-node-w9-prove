var express = require("express");

var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	console.log("Received a request for /");

	res.write("This is the root.");
	res.end();
});

app.get("/home", function(req, res) {
	// Controller
	console.log("Received a request for the home page");
	var name = getCurrentLoggedInUserAccount();
	var emailAddress = "kimberly@email.com";

	var params = {username: name, email: emailAddress};

	res.render("home", params);
});

app.listen(5000, function() {
	console.log("The server is up and listening on port 5000");
});

// Model

function getCurrentLoggedInUserAccount() {
	// access the database
	// make sure they have permission to be on the site

	return "Kimberly";
}
