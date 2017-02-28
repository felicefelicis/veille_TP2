var express = require('______________');
var app = ________________();

 

// Cette route répond à une requête POST pour la page d'accueil
app.post('___________', function (______, ________) {
   console.log("Reçu une requête POST pour la page d'accueil");
   res.__________('Hello POST');
})
// Cette route répond : "Hello World" sur la page d'accueil
// Le parametre req est l'objet request
// Le Paramètre res est l'objet result


app.get('/', function (req, res) {
   console.log("Reçu une requête GET pour la page d'accueil");
   res.send('Hello GET'); // sur la page d'accueil
})
// Cette route répond à une requête DELETE pour la page /del_user.
app.delete('/del_user', function (req, res) {
   console.log("Reçu une requête DELETE pour la page  /del_user");
   res.send('Hello DELETE');
})

// Cette route répond à une requête GET pour la page  /list_user page.
app.get('/_______', function (req, res) {
   console.log("Reçu une requête GET pour la page /list_user");
   res.send('Page list');
})

// Cette route répond à une requête GET pour abcd, abxcd, ab123cd, et tous les autres chemins acceptés par la regExp: ab*cd
app.get('___________', function(req, res) {   
   console.log("Reçu une requête  for /ab*cd");
   console.log('__dirname = ' + __dirname);
   res.send('Page accepté par la regExp : ab*cd');
   for(p in req)
      {

         console.log('attribut = ' + p )
      }
      console.log('url = ' + req.url)
    for(p in req.params)
    {
      console.log('params = ' + p + ' = ' + req.params[p])
    }  
      

})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Exemple l'application écoute sur http://%s:%s http://%s:%s", host, port)
})