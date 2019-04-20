var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
const cors = require('cors');
var app = express();

var corsOptions = {
    origin: 'http://localhost:4200'
}

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});