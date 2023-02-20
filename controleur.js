class Controleur{
    api_key = '1ac298995ec2f7c641fb3806216c0c04';
    ville = "Montreal";
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&mode=xml&units=metric&appid=' + api_key;

    loadMeteo() {
        fetch(url)
            .then(reponse => reponse.text())
                .then(xmlText => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xmlText, "application/xml");
                let city = xmlDoc.getElementsByTagName("city")[0];
                let texte = "noeud : " + city.nodeName + "<br/>";
                texte += "name : " + city.getAttribute("name") + "<br/>";
                texte += city.childNodes[1].nodeName + " : ";
                texte += city.childNodes[1].childNodes[0].nodeValue + "<br/>";

                let temperature = xmlDoc.getElementsByTagName("temperature")[0];
                texte += "noeud : " + temperature.nodeName + "<br/>";
                texte += "value : " + temperature.getAttribute("value") + "<br/>";
                texte += "unit : " + temperature.getAttribute("unit") + "<br/>";
                document.getElementById("meteo").innerHTML = texte;
            }
        );
    }
};

window.onload() = loadMeteo();