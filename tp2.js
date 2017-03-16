// req = request
// res = resultat

// importations
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express();
var db; // variable qui contiendra le lien sur la BD

app.set('view engine', 'ejs'); // générateur de template «ejs»

app.use(bodyParser.urlencoded({extended: true}));

/*
request handler = middleware fonction.  quand serveur recoit une requete cette fonction est chillbill.  
Elle peut décider si elle revoit une réponse ou si elle passe au la fonction de middleware suivant
*/
app.use((req, res, next) => {
  console.log("la route " + req.url + " avec la methode " + req.method);
  next();
});

app.use(express.static('public'));  // pour utiliser le dossier public

// connection à la bdd mongo carnet qui retourne un console log de confirmation lorsque la connection est reussie
MongoClient.connect('mongodb://127.0.0.1:27017/carnet', (err, database) => {
  if (err) return console.error(err)
  db = database;
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081');
  });
});

// va chercher le form de la collection adresse et affiche le contenu de la bdd
app.get('/',  (req, res, next) => {
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      // renders index.ejs
      // affiche le contenu de la BD 
      res.render('index_tp2.ejs', {adresse: resultat});
    }) 
})

// va chercher le form de la collection adresse et enregistre le contenu de la bdd qui redirrige a l'affichage
app.post('/adresse',  (req, res, next) => {
  db.collection('adresse').save(req.body, (err, result) => {
      if(err) return next(err);
      console.log('sauvegarder dans la BD');
      res.redirect('/');
    });
});


app.get('/detruire/:_id',  (req, res, next) => {
  db.collection('adresse').findOneAndDelete({_id:ObjectId(req.params._id)}, (err, resultat) => {
    if(err) return next(err);
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      // renders index.ejs
      // affiche le contenu de la BD
      res.redirect('/');
    }); 
  }); 
});

app.get('/modifier',  (req, res, next) => {

  //var nom = document.getElementById("nom").value;

  var cursor = db.collection('adresse').find().toArray(function(err, resultat){
    if(err) return next(err);
    // renders index.ejs
    // affiche le contenu de la BD
    console.log(req.url.slice(-1));
    res.redirect('/');
    //res.render('index1.ejs', {adresse: resultat, id:req.url.slice(-1)})
  }) 
})

app.post('/enregistrer',  (req, res, next) => {

  const newRecord = {
    'nom': req.body.nom, 
    'prenom': req.body.prenom, 
    'telephone': req.body.telephone, 
    'ville': req.body.ville, 
    'codepostal': req.body.codepostal
  };

  db.collection('adresse').update({_id:ObjectId(req.body._id)},{$set:newRecord}, (err, resultat) => {
    if(err) return next(err);
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      // renders index.ejs
      // affiche le contenu de la BD
      //res.render('index.ejs', {adresse: resultat})
      res.redirect('/');
    }) 
  }) 
})