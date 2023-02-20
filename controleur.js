class Controleur {
    api_key = '1ac298995ec2f7c641fb3806216c0c04';
    ville = document.getElementById("ville").textContent;
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.ville + '&mode=xml&units=metric&appid=' + this.api_key;
    temp;
    description;
    humidity;
    wind;
    vue = new Vue();



    loadMeteo() {
        console.log(this.url);
        fetch(this.url)
            .then(reponse => reponse.text())
            .then(xmlText => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xmlText, "application/xml");
                this.temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");

                this.description = xmlDoc.getElementsByTagName("weather")[1];
                this.humidity = xmlDoc.getElementsByTagName("humidity")[0];
                this.wind = xmlDoc.getElementsByTagName("wind")[0];
                console.log(this.temp);
                this.vue.afficheMeteo();





            }
            );
    }
};
window.onload = function () {
    (new Controleur()).loadMeteo();


};

