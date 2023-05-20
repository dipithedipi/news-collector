"use strict";

document.querySelectorAll("#btn-start").forEach((elm) => {
    elm.addEventListener("click", () => {
        if(localStorage.getItem("user")){
            location.href = "main_page.html"
        } else {
            location.href = "registation_page.html"
        }
    })
})