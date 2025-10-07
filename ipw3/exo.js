window.addEventListener("load", function () {

console.log("hello world !");


//alert ("bienvenu sur mon site ")

function custom(param){
    const el = document.getElementById("userbutton");
    let x =2;

    if(param>=5){

        el.innerHTML="log in"; //ton contenu va être "log in"
    }
    else{

        el.innerHTML="loguez)vous";
    }
    console.log("x vaut "+ x);
}
custom(5)
function display(){

    can=document.getElementById("userbutton");
    can=can.innerHTML;
}

const art_l= document.querySelectorAll("nav.articlesprincipaux div.articlesright")
for (const cle in art_l)
{
    console.log(art_l[cle].innerHTML)
}

const new_art= document.createElement("div")
new_art.innerHTML= "je suis un nouvel article"
new_art.setAttribute("class","articles2");

const h4 =document.createElement("h4")
new_art.appendChild(h4)
h4.innerHTML="<span class = je suis un article></span>"
console.log(new_art)

const dom_el=document.querySelector("nav.articlessecondaires div.row > div:nth-child(1)");
dom_el.appendChild(new_art);
})


