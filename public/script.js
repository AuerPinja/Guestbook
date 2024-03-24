let button = document.querySelector("#sendajax");
let ajaxContainer = document.querySelector("#ajaxMessages");
let ajaxForm = document.querySelector("#lomake");

ajaxForm.addEventListener("submit", function(){

    // Tehdään AJAX-kutsu, joka hakee viestit /messages-reitiltä
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/messages");
    xhr.onload = function() {
        if (xhr.status === 200) {
            ajaxContainer.innerHTML = xhr.responseText;
        } else {
            console.error('There was an error when loading messages.');
        }
    };
    xhr.send();
})


