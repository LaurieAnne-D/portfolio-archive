"use strict";

const nav = document.querySelector(".navLinks-ctn");
const clickableElement = document.querySelector('.clickable');

function handleClick() {
    if (clickableElement.classList.contains('fa-water')) {
        clickableElement.classList.remove('fa-ellipsis-vertical');
        clickableElement.classList.toggle('fa-xmark');
        nav.classList.toggle('navplay');
    } else if (clickableElement.classList.contains('fa-xmark')) {
        clickableElement.classList.remove('fa-xmark');
        clickableElement.classList.toggle('fa-water');
        nav.classList.toggle('navplay');
    }
}

clickableElement.addEventListener('click', handleClick);

function skillsCtn() {
    const skillsCtn = document.querySelector(".skills");
    const skillsCtnt = document.querySelector('.iconsCtn');
    let clone = skillsCtnt.cloneNode(true);

    skillsCtn.appendChild(clone);
}

skillsCtn();


fetch('assets/projets.json')
    .then(response => response.json())
    .then(projets => {
        console.log(projets);
        const projetContainer = document.querySelector(".projectsCtn");

        for (const projet of projets) {
            const li = document.createElement("li");
            const coverImg = document.createElement("img");
            const projectInfo = document.createElement("div");
            const infoIcon = document.createElement("i");

            const descriptionModal = projet.description;
            const projetTitle = projet.title;

            li.id = projetTitle;
            coverImg.src = projet.cover;

            projectInfo.classList.add("projectInfo");
            infoIcon.classList.add("fa-solid", "fa-circle-plus");


            if (projet.languages) {
                projet.languages.forEach(langage => {
                    const langageP = document.createElement("p");
                    langageP.textContent = ` ${langage}`;
                    projectInfo.appendChild(langageP);
                });
            }

            if (projet.infos) {
                projet.infos.forEach(info => {
                    const infoP = document.createElement("p");
                    infoP.textContent = ` ${info}`;
                    projectInfo.appendChild(infoP);
                });
            }

            li.appendChild(coverImg);
            li.appendChild(projectInfo);
            projectInfo.appendChild(infoIcon);
            projetContainer.appendChild(li);

            infoIcon.addEventListener('click', function () {
                openModal(projetTitle, descriptionModal);
            });
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
    });

function openModal(title, description) {
    const modalCtn = document.querySelector(".main");
    const modal = document.createElement("div");
    const transparent = document.createElement("div");
    const modalContent = document.createElement("section");
    const modalHeader = document.createElement("header");
    const modalTitle = document.createElement("h1")
    const modalIcon = document.createElement("i");
    const modalDescription = document.createElement("p")

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modal.classList.add("modal");
    modal.classList.remove("modalNone");
    transparent.classList.add("transparent");
    modalContent.classList.add("modalContent");
    modalHeader.classList.add("modalHeader");
    modalIcon.classList.add("fa-solid", "fa-xmark");

    modalCtn.insertBefore(modal, modalCtn.firstChild);
    modal.appendChild(transparent);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalDescription);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalIcon);

    modalIcon.addEventListener('click', function () {
        closeModal();
    })
}

function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal");
    modal.classList.add("modalNone");
}
