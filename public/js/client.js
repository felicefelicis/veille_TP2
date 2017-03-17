function ajout() {
  var shitHTMLaGenerer = '<div class="table-row">' 
    +   '<div class="text modifiable" value="" contentEditable="true"> </div>'
    +   '<div class="text modifiable" value="" contentEditable="true"></div>'
    +   '<div class="text modifiable" value="" contentEditable="true"></div>'
    +   '<div class="text" value=""></div>'
    +   '<i class="num fa fa-floppy-o" aria-hidden="true" onclick="createOrUpdate(this)" style="color:#e74c3c"></i>'
    +   '<i class="num fa fa-trash-o" aria-hidden="true" onclick="detruire(this)"></i>'
    + '</div>';

  var carnet = document.getElementById('carnet');

  carnet.innerHTML += shitHTMLaGenerer;
  window.scrollTo(0,document.body.scrollHeight);

}

function createOrUpdate(element) {
  var parent = element.parentElement;
  var id = parent.children[3].innerHTML;

  if(id){
    update(element);
  } else {
    create(element);
  }
}

function create(element) {
  var parent = element.parentElement;
  var nom = parent.children[0].innerHTML;
  var prenom = parent.children[1].innerHTML;
  var telephone = parent.children[2].innerHTML;
  var id = parent.children[3];

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", event => {

    if(xhr.readyState == 4 && xhr.status == 200) {
      id.innerHTML = JSON.parse(xhr.response).id;
      element.style.color = "#000";
    }
  });

  xhr.open('POST', "enregistrer", true);
  var data = { 
    "create":{
      "nom" : nom,
      "prenom" : prenom,
      "telephone" : telephone
    }
  };
  var sData = JSON.stringify(data);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(sData);
}

function update(element) {
  var parent = element.parentElement;
  var nom = parent.children[0].innerHTML;
  var prenom = parent.children[1].innerHTML;
  var telephone = parent.children[2].innerHTML;
  var id = parent.children[3].innerHTML;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", event => {

    if(xhr.readyState == 4 && xhr.status == 200) {
      element.style.color = "#2ecc71";
    }
  });

  xhr.open('POST', "modifier", true);
  var data = { 
    "modif":{
      "nom" : nom,
      "prenom" : prenom,
      "telephone" : telephone
    },
    "_id" : id 
  };
  var sData = JSON.stringify(data);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(sData);
}

function detruire(element) {
  var parent = element.parentElement;
  var id = parent.children[3].innerHTML;
  
  if(!id) {
    parent.parentElement.removeChild(parent);
    return; 
  }

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", event => {

    if(xhr.readyState == 4 && xhr.status == 200) {
      parent.parentElement.removeChild(parent);
    }
  });

  xhr.open('POST', "detruire/" + id, true);
  xhr.send();
}