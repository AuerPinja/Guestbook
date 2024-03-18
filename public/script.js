let button = document.querySelector("#sendajax");
let ajaxContainer = document.querySelector("#ajaxMessages");

button.addEventListener("click", function(){getMessages()});

function getMessages(){

    // Luo käyttäjän luvun perusteella hakuosoitteen
    data = "../data/messages.json"

    console.log(data);

    // Tehdään API kutsu
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', data, true);
    myRequest.onload = function(){
        var data = JSON.parse(myRequest.responseText);
        // Järjestetään pelit alehinnan mukaan suurimmasta pienempään
        steamData.sort(function (a, b) {
            return b.salePrice - a.salePrice;
        });
        // Lähetetään saatu data renderHTML funktioon kirjoittamaan haluttu data dokumenttiin
        renderHTML(steamData);
        };
    myRequest.send();
}