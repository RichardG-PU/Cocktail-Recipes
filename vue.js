class Vue {
    c;
    temp = "yo";
    description;
    humidity;
    wind;

    constructor(c) { // c is a controler
        this.c = c;
    }

    async afficheMeteo() {
        await this.c.loadMeteo();
        document.getElementById("tempNumber").innerHTML = Math.floor(this.c.temp);
        document.getElementById("weatherName").innerHTML = this.c.description;
        document.getElementById("humidity").innerHTML = this.c.humidity;
        document.getElementById("wind-number").innerHTML = this.c.wind;
        if(this.c.description.includes("sun") || this.c.description.includes("clear sky"))
            document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685-2-2.png";
        else if(this.c.description.includes("cloud"))
            document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685-5-2.png";
        else if(this.c.description.includes("snow"))
            document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685_3.png";

    }

    afficheListeRecettes() {

    }
    afficheUneRecette() {

    }
}