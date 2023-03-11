import {dataWorks, dataCategories} from "./loginAPI.js";

const token = sessionStorage.getItem("token");
console.log(token);

// GALLERY
// Récupération de l'élément du DOM qui accueillera la gallery
const gallery = document.querySelector(".gallery");

//Récupération des éléments depuis l'API
function viewGallery(dataWorks) {
    for (let i = 0; i < dataWorks.length; i++) {
        
        // Creation de la balise figure
        const dataGallery = document.createElement("figure");
        // Rattache la balise figure à la div gallery
        gallery.appendChild(dataGallery);
        
        const imageElement = document.createElement('img');
        imageElement.src = dataWorks[i].imageUrl;
        imageElement.alt = dataWorks[i].title;
        dataGallery.appendChild(imageElement);

        const nameElement = document.createElement("figcaption");
        nameElement.innerText = dataWorks[i].title;
        dataGallery.appendChild(nameElement);
    };
};
viewGallery(dataWorks);

// Récupération de l'élément du DOM qui accueillera les filtres
const filter = document.querySelector(".filters");

// Création du button TOUS
const allFilter = document.createElement("button");
    allFilter.innerHTML = "Tous";
    allFilter.id = "0";
    filter.appendChild(allFilter);
    
    // Affichage des éléments avec la fonction .onclick
    allFilter.onclick = function(){
        // Reset affichage gallery
        gallery.innerText = "";
        // Nouvel affichage avec le filtre 
        viewGallery(dataWorks);
};

// Focus sur le bouton all en vert

// Création des autres buttons en fonction de leur id
for (let i = 0; i < dataCategories.length; i++) {
    
    const btnFilter = document.createElement("button");
    btnFilter.innerHTML = dataCategories[i].name;
    btnFilter.id = dataCategories[i].id;
    filter.appendChild(btnFilter);
    
    // Affichage des éléments avec la fonction .onclick
    btnFilter.onclick = function () {
        // Fonction qui permet de filtrer par rapport au id des catégories
        const filterByCategories = dataWorks.filter(function (data) {
            if (data.category.id == dataCategories[i].id) {
                return data;
            }
        });
        // Reset affichage gallery
        gallery.innerText = "";
        // Nouvel affichage avec le filtre demandé
        viewGallery(filterByCategories);
    };
}
       