class Vue {
    c;
    temp;
    description;
    humidity;
    wind;
    drinkName;
    drinkImage;
    compteur = 0;
    drinks = [];
    pos = 0;


    constructor(c) { // c is a controler
        this.c = c;
    }

    async afficheMeteo() {
        await this.c.loadMeteo();
        document.getElementById("tempNumber").innerHTML = Math.floor(this.c.temp);
        document.getElementById("weatherName").innerHTML = this.c.description;
        document.getElementById("humidity").innerHTML = this.c.humidity;
        document.getElementById("wind-number").innerHTML = this.c.wind;
        if (this.c.description.includes("sun") || this.c.description.includes("clear sky"))
            document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685-2-2.png";
        else if (this.c.description.includes("cloud"))
            document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685-5-2.png";
        else if (this.c.description.includes("snow"))
            document.getElementById("weatherImg").src = "vecteezy_weather-3d-icon_9386351_685_3.png";
        else if (this.c.description.includes("mist"))
            document.getElementById("weatherImg").src = "mist.png";

    }

    async afficheListeRecettes() {
        let tab = [];
        while (this.compteur < 6) {
            await this.c.obtenirRecetteAleatoire();
            if(this.c.drinkName.length > 15)
                document.getElementById("roundText" + this.compteur).innerHTML = this.resizeText(this.c.drinkName);
            else
                document.getElementById("roundText" + this.compteur).innerHTML = this.c.drinkName;
            document.getElementById("r" + this.compteur).src = this.c.drinkImage;

            this.compteur++;
            tab.push(this.c.id);
        }
        this.compteur = 0;
        this.drinks.push(tab);
        console.log(this.drinks);
    }

    async go(direction) {
        let num = 0;
        switch(direction) {
            case "left": num = -1; break;
            case "right": num = 1; break;
        }
        if(this.drinks[this.pos + num] == null) {
            if(num == 1)
                return this.afficheListeRecettes();
        }
    }

    async afficheUneRecette() {

    }

    resizeText(text) {
        let stringTable = text.split(" ");
        let output = "";
        let half = stringTable.length/2;

        for(let i = 0; i < half; i++) {
            output += stringTable[i] + " ";
        }

        output += "..."

        return output;
    }
}