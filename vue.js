var c;

function afficheMeteo() {
    c = new Controleur();
    c.loadMeteo();
    document.getElementById("tempNumber").innerHTML = c.temp;
    console.log(c.temp);
    console.log("hello");

}

function afficheListeRecettes() {

}

function afficheUneRecette() {

}

window.onload = function () {

    afficheMeteo()
    console.log(c.temp);
};
