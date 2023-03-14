class Controleur {
    api_key = '1ac298995ec2f7c641fb3806216c0c04';
    ville = document.getElementById("ville").value;
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.ville + '&mode=xml&units=metric&appid=' + this.api_key;
    urlDrinkAlea = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    urlId = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    urlNom = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    temp;
    description;
    humidity;
    wind;
    drinkName;
    drinkImage;
    id;
    searchedName;
    searchedImage;
    searchCocktailBar = document.getElementById("searchCocktail").addEventListener("keypress", this.obtenirRecetteNom());
    searchedInstructions = [];
    searchedMeasures = [];

    loadMeteo() {
        return fetch(this.url)
            .then(reponse => reponse.text())
            .then(xmlText => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xmlText, "application/xml");
                console.log(ville);
                this.temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
                this.description = xmlDoc.getElementsByTagName("weather")[0].getAttribute("value");
                this.humidity = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value");
                this.wind = xmlDoc.getElementsByTagName("speed")[0].getAttribute("value");
                return this;
            }
            );
    }

    obtenirRecetteAleatoire() {
        return fetch(this.urlDrinkAlea)
            .then((response) => response.json())
            .then((data) => {
                this.drinkName = data.drinks[0].strDrink;
                this.drinkImage = data.drinks[0].strDrinkThumb;
                this.id = data.drinks[0].idDrink;
                return this;
            });
    }

    obtenirRecetteId(id) {
        return fetch(this.urlId + id)
            .then((response) => response.json())
            .then((data) => {
                this.drinkName = data.drinks[0].strDrink;
                this.drinkImage = data.drinks[0].strDrinkThumb;
                this.id = data.drinks[0].idDrink;
                console.log(this.urlDrinkAlea);
                return this;
            });
    }

    obtenirRecetteNom() {
        let nom = document.getElementById("searchCocktail").value;
        return fetch(this.urlNom + nom)
            .then((response) => response.json())
            .then((data) => {
                this.searchedName = data.drinks[0].strDrink;
                this.searchedImage = data.drinks[0].strDrinkThumb;
                console.log(this.searchedName);
                console.log(data.drinks[0][this.strIngredient + i]);
                for (let i of data.drinks) {
                    console.log(i.strIngredient + i, i.type());
                    for (let j of i)
                        console.log(j);
                };
                return this;
            });
    }
};


window.onload = async function () {
    const c = await new Controleur().loadMeteo();
    await c.obtenirRecetteAleatoire();
    const vue = new Vue(c);
    await vue.afficheMeteo();
    await vue.afficheListeRecettes();

    document.getElementById("leftArrow").addEventListener("click", function () {
        vue.go("left");
    });
    document.getElementById("rightArrow").addEventListener("click", function () {
        vue.go("right");
    });

    await document.getElementById("searchCocktail").addEventListener("input", function () {
        vue.afficheUneRecette();
    });
};
