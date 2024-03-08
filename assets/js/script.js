"use strict";
const nav = document.querySelector(".navLinks-ctn");



// Gestionnaire d'événements de clic
function handleClick() {
    const clickableElement = document.querySelector('.clickable');
    if (clickableElement.classList.contains('fa-water')) {
        clickableElement.classList.remove('fa-ellipsis-vertical');
        clickableElement.classList.toggle('fa-xmark');
        nav.classList.toggle('navplay');
    }
    else if (clickableElement.classList.contains('fa-xmark')) {
        clickableElement.classList.remove('fa-xmark');
        clickableElement.classList.toggle('fa-water');
        nav.classList.toggle('navplay');
    }

}

// Sélection de l'élément <i> et ajout du gestionnaire d'événements de clic
const clickableElement = document.querySelector('.clickable');
clickableElement.addEventListener('click', handleClick);

// Utilisation de fetch pour charger le fichier JSON
fetch('assets/data/projets.json')
    .then(response => response.json())
    .then(projets => {
        console.log(projets);
        const projetContainer = document.querySelector(".projectsCtn");

        for (const projet of projets) {
            const li = document.createElement("li");
            const coverImg = document.createElement("img");

            li.id = projet.title;
            coverImg.src = projet.cover;

            projetContainer.appendChild(li);
            li.appendChild(coverImg);
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
    });