let button = document.querySelector("#sendajax");
let ajaxContainer = document.querySelector("#ajaxMessages");
let ajaxForm = document.querySelector("#lomake");

ajaxForm.addEventListener("submit", function(event){
    event.preventDefault();
    let formData = new FormData(ajaxForm);

    console.log(formData)

    // Tehdään AJAX-pyyntö tallentamaan viesti
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/ajaxmessage");
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Päivitetään viestit näyttämällä ne uudelleen AJAXin kautta
            loadMessages();
        } else {
            console.error('Viestin tallennuksessa tapahtui virhe');
        }
    };
    xhr.send(formData);
})

function loadMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/messages");
    xhr.onload = function() {
        if (xhr.status === 200) {
            ajaxContainer.innerHTML = xhr.responseText;
        } else {
            console.error('Viestien hakemisessa tapahtui virhe');
        }
    };
    xhr.send();
}