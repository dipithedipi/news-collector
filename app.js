"use strict";

import { User, News } from "./classes.js";

if (!localStorage.getItem("user")) {
    location.href = "intro_page.html"
}

let previusRes = undefined
let savedDataUser = JSON.parse(localStorage.getItem("user"))
let savedNews = JSON.parse(localStorage.getItem("saved-news"))
if(!savedNews) savedNews = new Array()

let user = new User(
    savedDataUser.firstName,
    savedDataUser.lastName,
    savedDataUser.birthDate,
    savedDataUser.email,
    savedDataUser.sex,
    savedDataUser.password,
    savedDataUser.country,
    savedDataUser.province,
    savedDataUser.address,
    savedDataUser.phone,
    savedDataUser.newsLanguage,
    savedDataUser.newsTopics
)

let dataPage = 1
function requestLatestNews() {

    const url = new URL('http://127.0.0.1:5000/latest_headlines?');
    url.searchParams.append('countries', user.country);
    url.searchParams.append('page', dataPage);
    url.searchParams.append('lang', user.newsLanguage);
    url.searchParams.append('page_size', '100');
    console.log(url)

    return fetch(url, {
        method: 'GET',
    })
        .then(response => {
        if (!response.ok) {
            console.log(response)
            throw new Error('Errore nella richiesta delle ultime notizie');
        }
        return response.json();
        })
        .then(data => {
            if(dataPage == 1) document.getElementById("news-container").innerHTML = ""
            generateAllNews(data);
        })
        .catch(error => {
        console.error(error);
        });
}

let searchQueryText = ""
let searchMore = false
let newSearch = true

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
    gaming: "fuchsia",
    energy: "sky",
};

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


let titles = new Array()
let count = 0;
function generateAllNews(data) {
    if(newSearch) {
        titles = [];
        count = 0
    }
    console.log(data) 

    document.querySelectorAll("#loading-card").forEach((elm) => {
        elm.style.display = "none"
    })

    document.getElementById("laod-more-btn").innerHTML = 'Load more article <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>'
    document.getElementById("laod-more-btn").disabled = true

    data.articles.forEach((article) => {
        if(!user.newsTopics.includes(article.topic)) return
        if(titles.includes(article.title)) return;

        let articleElm = createNewsElementVertical(article.title, article.excerpt, article.media, article.author, article.published_date, article.link, article.topic)
        document.getElementById("news-container").appendChild(articleElm);
        titles.push(article.title)
        count++;
    })

    document.getElementById("laod-more-btn").disabled = false

    if(searchMore && count == 0) document.getElementById("laod-more-btn").disabled = true;
    if(newSearch) document.getElementById("laod-more-btn").disabled = false;

    if(count<12 && searchMore == false) {
        dataPage += 1;
        requestLatestNews();
        newSearch = false
    } else {
        newSearch = true
    }
}

function searchNews(searchQuery) {
    if(dataPage == 1) document.getElementById("news-container").innerHTML = ""
    const url = new URL('http://localhost:5000/search?');
    url.searchParams.append('page', dataPage);
    url.searchParams.append('lang', user.newsLanguage);
    url.searchParams.append('q', searchQuery);
    console.log(url)

    return fetch(url, {
        method: 'GET',
    })
        .then(response => {
        if (!response.ok) {
            console.log(response)
            throw new Error('Errore nella richiesta delle ultime notizie');
        }
        return response.json();
        })
        .then(data => {
            generateAllNews(data);
        })
        .catch(error => {
            console.error(error);
        });
}

document.getElementById("laod-more-btn").addEventListener("click", () => {
    document.getElementById("laod-more-btn").textContent = "Loading..."
    document.getElementById("laod-more-btn").disabled = true;
    dataPage += 1;
    newSearch = false;
    if(searchMore) searchNews(searchQueryText);
    else requestLatestNews()
})

document.getElementById("search-navbar-pc").addEventListener("keydown", (e) => {
    searchMore = true
    newSearch = true;
    if(e.keyCode === 13) {
        document.querySelectorAll("#loading-card").forEach((elm) => {
            elm.style.display = ""
        })

        searchQueryText = document.querySelector("#search-navbar-pc").value
        dataPage = 1;
        console.log(searchQueryText)
        console.log(typeof searchQueryText)
        if(searchQueryText === undefined || searchQueryText === null || searchQueryText == "") requestLatestNews()
        else searchNews(searchQueryText);
    }
})

document.querySelector("#search-btn-pc").addEventListener("click", () => {
    document.querySelectorAll("#loading-card").forEach((elm) => {
        elm.style.display = ""
    })

    searchQueryText = document.querySelector("#search-navbar-pc").value;
    console.log(searchQueryText)
    console.log(typeof searchQueryText)
    if(searchQueryText === undefined || searchQueryText === null || searchQueryText == "") requestLatestNews()
    else searchNews(searchQueryText);
  });

  document.getElementById("search-navbar-mobile").addEventListener("keydown", (e) => {
    searchMore = true
    newSearch = true;
    if(e.keyCode === 13) {
        document.querySelectorAll("#loading-card").forEach((elm) => {
            elm.style.display = ""
        })

        searchQueryText = document.querySelector("#search-navbar-mobile").value
        dataPage = 1;
        console.log(searchQueryText)
        console.log(typeof searchQueryText)
        if(searchQueryText === undefined || searchQueryText === null || searchQueryText == "") requestLatestNews()
        else searchNews(searchQueryText);
    }
})

document.querySelector("#search-btn-mobile").addEventListener("click", () => {
    document.querySelectorAll("#loading-card").forEach((elm) => {
        elm.style.display = ""
    })

    searchQueryText = document.querySelector("#search-navbar-mobile").value;
    console.log(searchQueryText)
    console.log(typeof searchQueryText)
    if(searchQueryText === undefined || searchQueryText === null || searchQueryText == "") requestLatestNews()
    else searchNews(searchQueryText);
  });

document.getElementById("delete-account").addEventListener("click", ()=>{
    if(confirm('Are you sure to cancel the account?')) {localStorage.clear(); location.href='./intro_page.html'}
})

requestLatestNews();