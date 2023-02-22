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
        document.getElementById("humidityNumber").innerHTML = this.c.humidity;
        document.getElementById("wind-number").innerHTML = this.c.wind;
        switch(this.c.description) {
            case "soleil":
                document.getElementById("weatherImg").src = "/img/soleil.png"
                break;
            case "overcast clouds":
                document.getElementById("weatherImg").src = "/img/cloudyForecast.png"
                break;
            default:
                // code block
        }
        console.log(this.c.temp);
        console.log("hello");

    }

    afficheListeRecettes() {

    }
    afficheUneRecette() {

    }
}