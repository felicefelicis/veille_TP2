var express = require('express');
var app = express();
var fs = require("fs");

var user = {
   "user4" : {
      "nom" : "Remus Lupin",
      "motpass" : "loupgarou",
      "profession" : "Professeur de Défence contre les forces du mal",
      "id": 5
   }
}






app.get('/ajouter', function (req, res) {
   // On récupere l'usagers 4.
   var monUtilisateur = JSON.stringify(user["user4"])
   // on l'ajoute au fichier
   fs.appendFile( __dirname + "/public/data/" + "usagers.json", monUtilisateur,  'utf8', function (err) {

       console.log( monUtilisateur );
       // res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})

