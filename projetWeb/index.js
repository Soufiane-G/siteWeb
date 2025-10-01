window.addEventListener("DOMContentLoaded", function (event) {

    const selecteur= document.getElementById("selecteur");
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
    const color=document.getElementById("color-select")
    color.addEventListener("change", function (event) {
        document.documentElement.style.setProperty( "--text-color",color.value)
    })
    const police=document.getElementById("police-select")
    police.addEventListener("change", function (event) {
        document.documentElement.style.fontSize=police.value
    })

})