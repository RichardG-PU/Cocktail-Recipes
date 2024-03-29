class Vue {
    c;
    temp;
    description;
    humidity;
    wind;
    drinkName;
    drinkImage;
    drinks = [];
    pos = 0;


    constructor(c) { // c is a controler
        this.c = c;
    }

    async afficheMeteo() {
        await this.c.loadMeteo();
        document.getElementById("tempNumber").innerHTML = Math.floor(this.c.temp);
        document.getElementById("weatherName").innerHTML = this.c.description;
        document.getElementById("humidity").innerHTML = this.c.humidity + "%<br> Humidity";
        document.getElementById("wind-number").innerHTML = this.c.wind;
        if (this.c.description.includes("sun") || this.c.description.includes("clear sky"))
            document.getElementById("weatherImg").src = "/img/sun.png";
        else if (this.c.description.includes("cloud"))
            document.getElementById("weatherImg").src = "/img/cloud.png";
        else if (this.c.description.includes("snow"))
            document.getElementById("weatherImg").src = "/img/snow.png";
        else if (this.c.description.includes("mist"))
            document.getElementById("weatherImg").src = "/img/mist.png";
        else if (this.c.description.includes("rain"))
            document.getElementById("weatherImg").src = "/img/rain.png";

    }

    async afficheListeRecettes() {
        let compteur = 0;
        let tab = [];
        while (compteur < 6) {
            await this.c.obtenirRecetteAleatoire();
            if (this.c.drinkName.length > 15)
                document.getElementById("roundText" + compteur).innerHTML = this.resizeText(this.c.drinkName);
            else
                document.getElementById("roundText" + compteur).innerHTML = this.c.drinkName;
            document.getElementById("r" + compteur).src = this.c.drinkImage;

            compteur++;
            tab.push(this.c.id);
        }
        this.drinks.push(tab);
    }

    async load(pos2) {
        for await (const drink of this.drinks[pos2]) {
            await this.c.obtenirRecetteId(drink);
            if (this.c.drinkName.length > 15) {
                document.getElementById("roundText" + this.drinks[pos2].indexOf(drink)).innerHTML = this.resizeText(this.c.drinkName);
            } else {
                document.getElementById("roundText" + this.drinks[pos2].indexOf(drink)).innerHTML = this.c.drinkName;

            }
            document.getElementById("r" + this.drinks[pos2].indexOf(drink)).src = this.c.drinkImage;
        }
    }

    async go(direction) {
        let num = 0;

        switch (direction) {
            case "left": num = -1; break;
            case "right": num = 1; break;
        }

        if (this.drinks[this.pos + num] == null) {
            if (num == 1) {
                this.pos++;
                return this.afficheListeRecettes();
            }
        } else if (this.drinks[this.pos + num] != null) {
            if (num == 1) {
                this.pos++;
                this.load(this.pos);
            } else {
                this.pos--;
                this.load(this.pos);
            }
        }

        return null;
    }

    async afficheUneRecette() {
        await this.c.obtenirRecetteNom(document.getElementById("searchCocktail").value);
        if (this.c.obtenirRecetteNom(document.getElementById("searchCocktail").value == null || "")) {
            this.c.containerDrinks.style.visibility = "hidden"
            this.c.containerDrinks.style.height = "1px";
        }
        this.c.containerDrinks.style.visibility = "visible"
        this.c.containerDrinks.style.height = "100%";
        document.getElementById("r").src = this.c.searchedImage;
        document.getElementById("roundText").innerHTML = this.c.searchedName
        for (let i = 1; i <= 15; i++) {
        }
    }

    resizeText(text) {
        let stringTable = text.split(" ");
        let output = "";
        let half = stringTable.length / 2;

        for (let i = 0; i < half; i++) {
            output += stringTable[i] + " ";
        }

        output += "..."

        return output;
    }

    async afficherCategorie(categorie) {
        let compteur = 0;
        let tab = [];
        while (compteur < 6) {
            await this.c.obtenirCategorie(categorie, compteur);
            while (!tab.includes(this.c.id)) {
                if (this.c.drinkName.length > 15)
                    document.getElementById("roundText" + compteur).innerHTML = this.resizeText(this.c.drinkName);
                else
                    document.getElementById("roundText" + compteur).innerHTML = this.c.drinkName;
                document.getElementById("r" + compteur).src = this.c.drinkImage;

                compteur++;
                tab.push(this.c.id);
            }
        }
        this.drinks.push(tab);
    }

}