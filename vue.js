class Vue {
    c;
    temp = "yo";
    description;
    humidity;
    wind;

    constructor(c) {
        this.c = c;
    }

    async afficheMeteo() {
        await this.c.loadMeteo();
        document.getElementById("tempNumber").innerHTML = Math.floor(this.c.temp);
        document.getElementById("weatherName").innerHTML = this.c.description;
        document.getElementById("humidity").innerHTML = this.c.humidity;
        document.getElementById("wind-number").innerHTML = this.c.wind;
        switch(this.c.description) {
            case "soleil":
                document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685-2 (2).png"
                break;
            case "overcast clouds":
                document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685-4-2.png"
                break;
        }
        console.log(this.c.temp);
        console.log("hello");

    }

    afficheListeRecettes() {

    }
    afficheUneRecette() {

    }
}