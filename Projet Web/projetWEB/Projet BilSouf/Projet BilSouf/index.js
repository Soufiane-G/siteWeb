window.addEventListener("DOMContentLoaded", function () {

    /*Bonus de sauvegarde de la couleur*/
    const savedColor =localStorage.getItem("text-color");
    const savedFont=localStorage.getItem("fontSize");
    if (savedColor ) {
        document.documentElement.style.setProperty("--text-color", savedColor);
    }
    if(savedFont){
        document.documentElement.style.setProperty=savedFont;
    }
    /*code JC pour le selecteur*/
    const selecteur = document.getElementById("selecteur");
    if (selecteur) {
        selecteur.innerHTML = `<label for="color-select">Couleur : </label>
        <select id="color-select">
            <option value="#000000" > NOIR </option>
            <option value="#0000FF"> BLEU</option>
            <option value="#FF0000" > ROUGE</option>
        </select>
        <label for="police-select">Taille : </label>
        <select id="police-select">
            <option value="10px"> PETIT</option>
            <option value="16px"> MOYEN</option>
            <option value="24px"> GRAND</option>
        </select>`;
    }
    const color = document.getElementById("color-select")
    if(color) {
        color.addEventListener("change", function () {
            document.documentElement.style.setProperty("--text-color", color.value); 
            localStorage.setItem("text-color", color.value)
        })
    }

    const police = document.getElementById("police-select")
    if(police) {
        police.addEventListener("change", function () {
            document.documentElement.style.fontSize = police.value
            localStorage.setItem("policeSize", police.value);
        })
    }
    //Affichez/Masquer l'article
    const article = document.getElementById("article-main"); //Récupère l'élément de <article>.
    const bouton = document.getElementById("masquer-article"); // récupère l'élement de <button>.
    bouton.addEventListener("click", function () {

        if (article.style.display !== "none") { // pour vérifier si l'article n'est pas à l'état caché
            article.style.display = "none";       // On cache l'article
            bouton.textContent = "Afficher l'article"; // Le bouton change et se nomme "Afficher l'article."
        } else {
            article.style.display = "block";            // si l'article est visible :
            bouton.textContent = "Masquer l'article";  //le bouton devient masquer l'article
        }

    })


    /*affichage des infos en haut à droite */
    const card = document.querySelectorAll('.info-art');              // toute la carte
    const position = document.getElementById("position");                  // position de l'information affo-ichée
    const msg = " "

    /*création d'une fonction afin de pouvoir la réutiliser plus tard
    * récupération de tout le contenu des articles dont la class est .info-art ensuite l'on récupère
    * le "text-muted" de l'article qui aura provoqué l'event
    * Les infos sont retournées dans la position ou on laisse le cadre vide */
    function over(event) {
        const art = event.currentTarget.querySelector(".text-muted");
        if(art) {
            position.innerHTML = art.innerText;
        }
        else{
            position.innerHTML = msg
        }
    }

         const articleSecondaire = document.querySelectorAll('.article-secondaire');
         const affichePlus = document.getElementById("montrer-plus");
         const afficheMoins = document.getElementById("montrer-moins");

         let afficherArticle = 0;

    // Fonction pour afficher les articles
        function AfficherArticles() {
        for (let i = 0; i < articleSecondaire.length; i++) {
            // Affiche seulement les N premiers articles selon afficherArticle
            if (i < afficherArticle) {
                articleSecondaire[i].style.display = "block";
            } else {
                articleSecondaire[i].style.display = "none";
            }
        }
    }

    // Au clic sur "Afficher plus"
        affichePlus.addEventListener("click", function () {
         if (afficherArticle < articleSecondaire.length) {
            afficherArticle += 2; // Incrémente d'abord
            if (afficherArticle > articleSecondaire.length) {
                afficherArticle = articleSecondaire.length;
            }
            AfficherArticles();
            console.log("Afficher plus -> ", afficherArticle);
        }
    });

    // Au clic sur "Afficher moins"
        afficheMoins.addEventListener("click", function () {
        if (afficherArticle > 0) {
            afficherArticle -= 2;
            if (afficherArticle < 0) {
                afficherArticle = 0;
            }
            AfficherArticles();
            console.log("Afficher moins -> ", afficherArticle);
        }
    });

    // Initialisation
    AfficherArticles(); 

  
    function out() {
        position.innerHTML = msg;
    }

    card.forEach(elem=> {
    elem.addEventListener("mouseover", over);
    elem.addEventListener("mouseout", out);
})

        /* Formulaire --> Mot cléfs   */
        const motForm   = document.getElementById('motInput');        // l’input de recherche
        const titreForm = [...document.querySelectorAll('.titre-form')]; // Nodelist --> ... transforme en tableau pour la parcourir

        function filtre() {
         const q = motForm.value.toLowerCase(); //Prends la valeur de l'utilisateur et la rends insensible

        titreForm.forEach(a => {
         const titre = a.textContent.toLowerCase().trim(); // texte visible --> on le rend insensible et retire les espaces
         // remonte au conteneur article pour cacher/montrer tout le bloc
         const card = a.closest('article , .card') || a; //remonte pour trouver la valeur qui matche avec le selecteur
         card.style.display = (q && !titre.includes(q)) ? 'none' : '';// “si l’utilisateur a tapé quelque chose ET que le titre ne contient pas ce texte
         });
        }
        motForm.addEventListener('input', filtre);
        filtre();

        
       
    /*FORMULAIRE DE RECHERCHE COMPLET + COMPTEUR */
   
    const motFormul = document.getElementById('motInput');
    const dureeMin = document.getElementById("dureeMin");  
    const dureeMax = document.getElementById("dureeMax"); 
    const dureeMinValue = document.getElementById("dureeMinValue");
    const dureeMaxValue = document.getElementById("dureeMaxValue");
    const nombreArticlesInput = document.getElementById("nombreArticles");
    const articlesFiltrables = document.querySelectorAll(".info-art");
    const compteur = document.querySelector('.art-visible'); // Le compteur dans le header

    // Fonction UNIQUE qui applique TOUS les filtres + met à jour le compteur
    function appliquerFiltres() {
        // Récupère les valeurs des filtres
        const motCle = motFormul ? motFormul.value.toLowerCase().trim() : ''; //vérifie si l'input est pas null/vide --> si oui retourne chaîne vide
        const minVal = dureeMin ? parseInt(dureeMin.value) : 0;
        const maxVal = dureeMax ? parseInt(dureeMax.value) : 60;
        const maxArticles = nombreArticlesInput ? parseInt(nombreArticlesInput.value) : 100; //nombre d'article à afficher par défaut 100.
        
        let compteurAffiches = 0; // Compte les articles réellement affichés

        articlesFiltrables.forEach(article => {
            let correspondCriteres = true;

            // FILTRE 1 : Mot-clé dans le titre
            if (motCle) {
                const titre = article.querySelector('.titre-form');                                //titres des articles
                if (titre) {
                    const titreText = titre.textContent.toLowerCase().trim();                       //récupère le texte visible
                    if (!titreText.includes(motCle)) {                                             //Si le titre ne contient pas de mot cléfs
                        correspondCriteres = false;                                                //On le met à false
                    }
                }
            }

            // FILTRE 2 : Temps de lecture (readtime min/max)
            const readtimeElement = article.querySelector(".readtime");
            if (readtimeElement) {
                const texte = readtimeElement.textContent;
                const match = texte.match(/(\d+)\s*min/);                    //.match --> tester une expression régulière (regex)
                if (match) {
                    const tempsLecture = parseInt(match[1]);                 //
                    if (tempsLecture < minVal || tempsLecture > maxVal) {       // si le temps de lecture différent de la plage alors false.
                        correspondCriteres = false;
                    }
                }
            }

            // FILTRE 3 : Nombre maximum d'articles
            // Si l'article correspond aux critères ET qu'on n'a pas atteint le max
            
            if (correspondCriteres && compteurAffiches < maxArticles) {     //Si l'article correspond aux critères ET qu'on n'a pas atteint le max
                article.style.display = "";                                   //réinitialise la propriété display -> affiche l'article
                compteurAffiches++;                                             // Incrémente le compteur
            } else {
                article.style.display = "none";                                //cache l'article
            }
        });

        // Met à jour le compteur dans le header
        if (compteur) {
            compteur.textContent = "Nombre d'articles visibles : " + compteurAffiches;   
        }
    }

    // Fonction pour gérer les sliders de durée
    function updateSliders() {
        let minVal = parseInt(dureeMin.value);
        let maxVal = parseInt(dureeMax.value);

        // Empêche le que le minimum dépasse le max
        if (minVal > maxVal) {
            minVal = maxVal;
            dureeMin.value = minVal;
        }
        if (maxVal < minVal) {
            maxVal = minVal;
            dureeMax.value = maxVal;
        }

        // Met à jour l'affichage des valeurs
        if (dureeMinValue) dureeMinValue.textContent = minVal;
        if (dureeMaxValue) dureeMaxValue.textContent = maxVal;

        // Applique tous les filtres
        appliquerFiltres();
    }

    // Event listeners
    if (motFormul) {
        motFormul.addEventListener('input', appliquerFiltres);   // on appele la fonction quand l'utilisateur entre qlq chose
    }

    if (dureeMin) {
        dureeMin.addEventListener("input", updateSliders);
    }

    if (dureeMax) {
        dureeMax.addEventListener("input", updateSliders);
    }

    // Event listener pour le nombre d'articles
    if (nombreArticlesInput) {                                       //Qd le nombre d'article change on réinitialise avec la fonction
        nombreArticlesInput.addEventListener('input', appliquerFiltres);
    }

    // Initialisation au chargement
    if (dureeMin && dureeMax) {
        updateSliders();
    } else {
        appliquerFiltres();
    }

        
})
