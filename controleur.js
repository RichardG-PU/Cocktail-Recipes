class Controleur {
    api_key = '1ac298995ec2f7c641fb3806216c0c04';
    ville = document.getElementById("ville").value;
    urlWeather = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.ville + '&mode=xml&units=metric&appid=' + this.api_key;
    temp;
    description;
    humidity;
    wind;
    cocktails;
    /*
    Lookup a random cocktail
    www.thecocktaildb.com/api/json/v1/1/random.php

    Search cocktail by name
    www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

    Lookup full cocktail details by id
    www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

    Filter by Category
    www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
    */

    loadMeteo() {
        return fetch(this.urlWeather)
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

    loadRecipeRnd(url) {
        
        fetch(url)
            .then(response => response.json())
            .then(json => {
                var rnd = json;
                var counter = 0
                while(!this.cocktails.contains(rnd.Name) && counter < 6) {
                    this.cocktails.add(rnd.Name);
                    counter++;
                };
            }
        );
    }

    loadRecipeId(id) {

    }

    loadRecipeCategory(cat) {
        var rnd = this.loadRecipeRnd();
        var counter = 0
        while(!this.cocktails.contains(rnd.Name) && counter < 6) {
            this.cocktails.add(rnd.Name);
            counter++;
        }
    }

    loadRecipeName(name) {

    }
};
window.onload = async function () {
    const c = await new Controleur().loadMeteo();
    const vue = new Vue(c);
    await vue.afficheMeteo();
    await c.loadRecipeRnd("http://thecocktaildb.com/api/json/v1/1/random.php");
};
