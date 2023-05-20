"use strict";

import { News } from "./classes.js";

let rawSavedNews = localStorage.getItem("saved-news");
let savedNews = new Array();

const categoryColors = {
    news: "blue",
    sport: "green",
    tech: "purple",
    world: "yellow",
    finance: "indigo",
    politics: "red",
    business: "gray",
    economics: "pink",
    entertainment: "orange",
    beauty: "rose",
    travel: "stone",
    music: "fucsia",
    food: "amber",
    science: "orange",
    gaming: "red",
    energy: "sky",
};
let searchQueryText = undefined;


function calculateHourDifference(givenTime) {
    const currentTime = new Date();
    const givenHour = givenTime.getHours();
    const givenMinutes = givenTime.getMinutes();

    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    const hourDifference = currentHour - givenHour;
    const minuteDifference = currentMinutes - givenMinutes;

    let totalDifference = hourDifference;

    if (minuteDifference < 0) {
        totalDifference--;
    }

    return Math.abs(totalDifference);
}

function createColoredSpan(content, color) {
    const span = document.createElement('span');
    span.className = `bg-${color}-100 text-${color}-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${color}-900 dark:text-${color}-300`;
    span.textContent = content;
    return span;
}

function createNewsElementVertical(title, description, imageLink, author, publicationDate, linkArticle, topics) {
    publicationDate = publicationDate.replace(" ", "T");
    publicationDate = new Date(publicationDate);

    // Creazione dell'elemento principale <div> con le classi corrispondenti
    const div = document.createElement('div');
    div.className = 'max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';

    // Creazione dell'elemento <a> per il link
    const linkElement = document.createElement('a');

    // Creazione dell'elemento <div> per centrare l'immagine
    const imageContainer = document.createElement('div');
    imageContainer.className = 'flex justify-center pt-2';

    // Creazione dell'elemento <img> per l'immagine
    const imageElement = document.createElement('img');
    imageElement.className = 'rounded-t-lg';
    imageElement.src = imageLink;
    imageElement.alt = '';

    // Aggiunta dell'elemento <img> all'elemento <div> per centrare l'immagine
    imageContainer.appendChild(imageElement);

    // Aggiunta dell'elemento <div> per centrare l'immagine all'elemento <a>
    linkElement.appendChild(imageContainer);

    // Aggiunta dell'elemento <a> all'elemento principale <div>
    div.appendChild(linkElement);

    // Creazione dell'elemento <div> per il contenuto
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-5';

    // Creazione dell'elemento <a> per il titolo
    const titleLinkElement = document.createElement('a');

    // Creazione dell'elemento <h5> per il titolo
    const titleHeading = document.createElement('h5');
    titleHeading.className = 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white';
    titleHeading.textContent = title;

    // Aggiunta dell'elemento <h5> all'elemento <a>
    titleLinkElement.appendChild(titleHeading);

    // Aggiunta dell'elemento <a> all'elemento <div> del contenuto
    contentDiv.appendChild(titleLinkElement);

    // Creazione dell'elemento <p> per la descrizione
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.className = 'mb-3 font-normal text-gray-700 dark:text-gray-400';
    descriptionParagraph.textContent = description;

    // Aggiunta dell'elemento <p> all'elemento <div> del contenuto
    contentDiv.appendChild(createColoredSpan(topics, categoryColors[topics]));
    contentDiv.appendChild(descriptionParagraph);

    // Creazione dell'elemento <div> per il footer
    const footerDiv = document.createElement('div');
    footerDiv.className = 'mt-auto justify-between';

    // Creazione dell'elemento <p> per il tempo trascorso
    const timeElapsedParagraph = document.createElement('p');
    timeElapsedParagraph.className = 'text-gray-500 dark:text-gray-400 text-sm';
    const timeElapsed = calculateHourDifference(publicationDate);
    timeElapsedParagraph.textContent = `Published ${timeElapsed} hour${timeElapsed !== 1 ? 's' : ''} ago by ${author}`;

    // Aggiunta dell'elemento <p> al footer
    footerDiv.appendChild(timeElapsedParagraph);

    // Creazione dell'elemento <a> per il link "Read more"
    const readMoreLink = document.createElement('a');
    readMoreLink.href = linkArticle;
    readMoreLink.target = '_blank';
    readMoreLink.className = 'inline-flex items-center mr-4 mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

    // Creazione dell'elemento <svg> per l'icona "Read more"
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('aria-hidden', 'true');
    svgElement.setAttribute('class', 'w-4 h-4 ml-2 -mr-1');
    svgElement.setAttribute('fill', 'currentColor');
    svgElement.setAttribute('viewBox', '0 0 20 20');

    // Creazione dell'elemento <path> per il percorso dell'icona "Read more"
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('fill-rule', 'evenodd');
    pathElement.setAttribute(
        'd',
        'M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
    );
    pathElement.setAttribute('clip-rule', 'evenodd');

    // Aggiunta dell'elemento <path> all'elemento <svg>
    svgElement.appendChild(pathElement);

    // Aggiunta del testo e dell'elemento <svg> all'elemento <a> del link "Read more"
    readMoreLink.textContent = 'Read more';
    readMoreLink.appendChild(svgElement);

    // Aggiunta dell'elemento <a> del link "Read more" al footer
    footerDiv.appendChild(readMoreLink);

    // Creazione dell'elemento <button> per il pulsante "Save"
    const saveButton = document.createElement('button');
    saveButton.className = 'inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none';
    saveButton.textContent = 'Save';

    saveButton.addEventListener("click", () => {
        const newsIndex = savedNews.findIndex(news => news.title === title);
        if (newsIndex === -1) {
            // La notizia non è ancora stata salvata
            savedNews.push(new News(
                title,
                description,
                imageLink,
                author,
                publicationDate,
                linkArticle,
                topics
            ));
            saveButton.textContent = "Saved";
            saveButton.style.backgroundColor = "green";
        } else {
            // La notizia è già stata salvata, la rimuoviamo
            savedNews.splice(newsIndex, 1);
            saveButton.textContent = "Save";
            saveButton.style.backgroundColor = "red";
            setTimeout(() => {
                searchSavedArticle();
            },1000)
        }
        localStorage.setItem("saved-news", JSON.stringify(savedNews));
    });

    // Verifica se la notizia è già stata salvata
    const newsIndex = savedNews.findIndex(news => news.title === title);
    if (newsIndex !== -1) {
        // La notizia è già stata salvata
        saveButton.textContent = "Saved";
        saveButton.style.backgroundColor = "green";
    } else {
        // La notizia non è stata salvata
        saveButton.textContent = "Save";
        saveButton.style.backgroundColor = "red";
    }

    // Aggiunta del pulsante "Save" al footer
    footerDiv.appendChild(saveButton);

    // Aggiunta dell'elemento <div> del footer all'elemento <div> del contenuto
    contentDiv.appendChild(footerDiv);

    // Aggiunta dell'elemento <div> del contenuto all'elemento principale <div>
    div.appendChild(contentDiv);

    // Ritorno dell'elemento HTML completo
    return div;
}

(function () {
    document.getElementById("news-saved-container").innerHTML = "";

    if (!rawSavedNews || rawSavedNews.length == 0 || rawSavedNews == "[]") {
        console.log("empty")
        document.getElementById("news-not-found-container").style.display = "";
        return
    }

    document.getElementById("news-not-found-container").style.display = "none";
    rawSavedNews = JSON.parse(rawSavedNews)
    rawSavedNews.forEach((rawNews) => {
        savedNews.push(new News(
            rawNews.title,
            rawNews.description,
            rawNews.imageLink,
            rawNews.author,
            rawNews.publicationDate,
            rawNews.linkArticle,
            rawNews.topics
        ))
        let elm = createNewsElementVertical(
            rawNews.title,
            rawNews.description,
            rawNews.imageLink,
            rawNews.author,
            rawNews.publicationDate,
            rawNews.linkArticle,
            rawNews.topics
        )
        document.getElementById("news-saved-container").appendChild(elm)
    });
})()

function searchSavedArticle() {
    console.log("new search")
    console.log(searchQueryText)
    console.log(typeof searchQueryText)
    document.getElementById("news-saved-container").innerHTML = "";
    if(savedNews.length == 0) {
        document.getElementById("news-not-found-container").style.display = "";
        return
    }
    savedNews.forEach((news) => {
        if(searchQueryText === null || searchQueryText === undefined) {
        
        } else {
            if ((!news.title.toLowerCase().includes(searchQueryText.toLowerCase()) && !news.description.toLowerCase().includes(searchQueryText.toLowerCase()))) return
        }
        let elm = createNewsElementVertical(
            news.title,
            news.description,
            news.imageLink,
            news.author,
            news.publicationDate,
            news.linkArticle,
            news.topics
        )
        console.log("found")
        document.getElementById("news-saved-container").appendChild(elm)
    })
}

document.getElementById("btn-0-news").addEventListener("click", () => {
    location.href = './main_page.html'
})

document.querySelector("#search-navbar-pc").addEventListener("input", (e) => {
    searchQueryText = e.target.value;
    searchSavedArticle();
  });
  
  document.querySelector("#search-btn-pc").addEventListener("click", () => {
    searchQueryText = document.querySelector("#search-navbar-mobile").value;
    searchSavedArticle();
  });

  document.querySelector("#search-navbar-mobile").addEventListener("input", (e) => {
    searchQueryText = e.target.value;
    searchSavedArticle();
  });
  
  document.querySelector("#search-btn-mobile").addEventListener("click", () => {
    searchQueryText = document.querySelector("#search-navbar-mobile").value;
    searchSavedArticle();
  });

  document.getElementById("delete-account").addEventListener("click", ()=>{
    if(confirm('Are you sure to cancel the account?')) {localStorage.clear(); location.href='./intro_page.html'}
})