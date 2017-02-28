var express = require('express');
var app = express();
var fs = require("fs");



app.get('_____________', function (req, res) {

	console.log('le dossier racine = ' + __dirname)
   // First read existing users.
   fs.readFile( __dirname + "____________" + "usagers.json", 'utf8', function (err, data) {
       
       data = JSON.parse( data );
       delete data["user" + ______________];
       
       console.log( ____________ );
       res.end( JSON.stringify(_______________));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})