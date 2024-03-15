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
fetch('assets/projets.json')
    .then(response => response.json())
    .then(projets => {
        console.log(projets);
        const projetContainer = document.querySelector(".projectsCtn");

        for (const projet of projets) {
            const li = document.createElement("li");
            const coverImg = document.createElement("img");

            li.id = projet.title;
            coverImg.src = projet.cover;

            const projectInfo = document.createElement("div");
            projectInfo.classList.add("projectInfo");
            const title = document.createElement("p");
            title.textContent = projet.title;
            projectInfo.appendChild(title);

            if (projet.languages) {
                projet.languages.forEach(langage => {
                    const langageP = document.createElement("p");
                    langageP.textContent = ` ${langage}`;
                    projectInfo.appendChild(langageP);
                });
            } else {
                const langageP = document.createElement("p");
                langageP.textContent = "Language: N/A";
                projectInfo.appendChild(langageP);
            }

            if (projet.infos) {
                projet.infos.forEach(info => {
                    const infoP = document.createElement("p");
                    infoP.textContent = ` ${info}`;
                    projectInfo.appendChild(infoP);
                });
            } else {
                const infoP = document.createElement("p");
                infoP.textContent = "Service: N/A";
                projectInfo.appendChild(infoP);
            }


            li.appendChild(coverImg);
            li.appendChild(projectInfo);

            projetContainer.appendChild(li);
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
    });

// Sélection de l'élément de contenu
const skillsCtn = document.querySelector(".skills");
const skillsCtnt = document.querySelector('.iconsCtn');

// Clonage du contenu
var clone = skillsCtnt.cloneNode(true);

// Ajout du clone au conteneur
skillsCtn.appendChild(clone);
