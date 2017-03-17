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

app.use(bodyParser.json());

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

app.post('/detruire/:_id',  (req, res, next) => {
  db.collection('adresse').findOneAndDelete({_id:ObjectId(req.params._id)}, (err, resultat) => {
    if(err) return next(err);
    res.sendStatus(200);
  }); 
});

app.post('/enregistrer',  (req, res, next) => {
  const newRecord = {
    'nom': req.body.create.nom, 
    'prenom': req.body.create.prenom, 
    'telephone': req.body.create.telephone
  };

  db.collection('adresse').insertOne(newRecord, (err, resultat) => {
    if(err) return next(err);
    res.send({ "id": resultat.insertedId });
  }); 
});

app.post('/modifier',  (req, res, next) => {
  const newRecord = {
    'nom': req.body.modif.nom, 
    'prenom': req.body.modif.prenom, 
    'telephone': req.body.modif.telephone
  };

  db.collection('adresse').update({_id:ObjectId(req.body._id)},{$set:newRecord}, (err, resultat) => {
    if(err) return next(err);
    res.sendStatus(200);
  }); 
});