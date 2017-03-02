// req = request
// res = resultat

const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs'); // générateur de template «ejs»
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

var db // variable qui contiendra le lien sur la BD

// connection à la bdd mongo carnet qui retourne un console log de confirmation lorsque la connection est reussie
MongoClient.connect('mongodb://127.0.0.1:27017/carnet', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

// va chercher le form de la collection adresse et affiche le contenu de la bdd
app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat})

    }) 
})

/* code inutile au fonctionnement
app.get('/formulaire',  (req, res) => {
   console.log('la route  get / = ' + req.url)
   res.sendFile(__dirname + "forme.htm")
})*/

// va chercher le form de la collection adresse et enregistre le contenu de la bdd qui redirrige a l'affichage
app.post('/adresse',  (req, res) => {
  db.collection('adresse').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('sauvegarder dans la BD')
      res.redirect('/')
    })
})

