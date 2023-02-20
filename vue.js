class vue {
    c = new Controleur();


    afficheMeteo() {
        this.c = new Controleur();
        this.c.loadMeteo();
        document.getElementById("tempNumber").innerHTML = this.c.temp;
        console.log(this.c.temp);
        console.log("hello");

    }

    afficheListeRecettes() {

    }
    afficheUneRecette() {

    }


}

