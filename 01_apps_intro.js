var express = require('________________');
var app = ___________________();

app.get('/', function (________, ____________) {
   res.____________('Hello World');
})

var server = app.______________(8081, function () {
	// for (var p in _____________) {console.log(_________)}
   var host = server.address()._______
   var port = server.address()._____________
   
   console.log("Exemple l'application écoute sur http://%s:%s", host, port)
})