window.addEventListener("DOMContentLoaded", function (event) {

    const selecteur = document.getElementById("selecteur");
    if (selecteur) {
        selecteur.innerHTML = `<label for="color-select">Couleur : </label>

        <select id="color-select">

            <option value="#000000"> NOIR</option>
            <option value="#0000FF"> BLEU</option>
            <option value="#FF0000"> ROUGE</option>

        </select>
        <label for="police-select">Taille : </label>

        <select id="police-select">

            <option value="12px"> PETIT</option>
            <option value="16px"> MOYEN</option>
            <option value="24px"> GRAND</option>

        </select>`;
    }
    const color = document.getElementById("color-select")
    color.addEventListener("change", function (event) {
        document.documentElement.style.setProperty("--text-color", color.value)
    })
    const police = document.getElementById("police-select")
    police.addEventListener("change", function (event) {
        document.documentElement.style.fontSize = police.value
    })

    const article = document.getElementById("article-main"); //Récupère l'élément de <article>.
    const bouton = document.getElementById("masquer-article"); // récupère l'élement de <button>.
    bouton.addEventListener("click", function () {

        if (article.style.display !== "none") { // pour vérifier si l'article n'est pas vide donc "visible" ici
            article.style.display = "none";       // On cache l'article
            bouton.textContent = "Afficher l'article"; // Le bouton change et se nomme "Afficher l'article"
        } else {
            article.style.display = "block";            // si l'article est visible :
            bouton.textContent = "Masquer l'article";  //le bouton devient masquer l'article
        }

    })


    /*affichage des infos en haut a droite */
    const card = document.querySelectorAll('.info-art');              // toute la carte
    const position = document.getElementById("position");                  // position de l'information affo-ichée
    const msg = " "

    /*création d'un fonction afin de pouvoir la réutiliser plus tard
    * récupération de tous le contenu des articles dont la class est .info-art ensuite on récupère
    * le text-muted de larticle qui aura provoquer l'event
    * on retourne les infos dans la position ou on laisse le cadre vide */
    function over(event) {
        const art = event.currentTarget.querySelector(".text-muted");
        if(art) {
            position.innerHTML = art.innerText;
        }
        else{
            position.innerHTML = msg
        }
    }

    function out() {
        position.innerHTML = msg;
    }

    card.forEach(elem=> {
    elem.addEventListener("mouseover", over);
    elem.addEventListener("mouseout", out);
})

})


/*commentaire test pour le commit*/




