const express = require('express');
const bodyParser= require('___________')
const MongoClient = require('___________').MongoClient
const app = express();
app.set('view engine', '______________'); // générateur de template «ejs»
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://______________', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})





app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresse').__________()._____________(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('____________', {___________: _______________})

    }) 
    

})


app.get('________________',  (req, res) => {
   console.log('la route  get / = ' + req.url)
   res.sendFile(__dirname + "_____________")
})


app.post('______________',  (req, res) => {
  db.collection('adresse').__________(req.____________, (err, result) => {
      if (err) return console.log(err)
      console.log('sauvegarder dans la BD')
      res.redirect('___________________')
    })
})

