"use strict"

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(localStorage.getItem("user") !== null){
    location.href = "main_page.html"
}

import { User } from "./classes.js"

let firstName = document.getElementById("firstname")
let lastName = document.getElementById("lastname")
let email = document.getElementById("email")
let password = document.getElementById("password")
let confirmPassord = document.getElementById("confirm-password")
let acceptedPolicy = document.getElementById("terms")
let birthDate = document.getElementById("birthdate")
let phone = document.getElementById("phone")
let sex = document.getElementById("sex")
let country = document.getElementById("country")
let province = document.getElementById("province")
let address = document.getElementById("address")
let language = document.getElementById("language")

document.getElementById("step_1_next_btn").addEventListener("click", ()=>{
    if(!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassord.value) {
        alert("fill all the input box")
        return
    }

    if(password.value != confirmPassord.value) {
        alert("password are not the same")
        return
    }

    if(!emailRegex.test(email.value)) {
        alert("mail not valid")
        return
    }

    if(!acceptedPolicy.checked) {
        alert("plese accept the policy")
        return
    }

    document.getElementById("step_1").style.display = "none"
    document.getElementById("step_2").style.display = ""
    document.getElementById("step_3").style.display = "none"

    document.getElementById("progress_step_1").classList.remove("text-blue-600", "dark:text-blue-500")
    document.getElementById("progress_step_2").classList.add("text-blue-600", "dark:text-blue-500")
    document.getElementById("progress_step_3").classList.remove("text-blue-600", "dark:text-blue-500")

})

document.getElementById("step_2_next_btn").addEventListener("click", ()=>{
    if(!birthDate.value || !phone.value || !country.value || !province.value || !address.value) {
        alert("fill all the input box")
        console.log(birthDate.value)
        console.log(phone.value)
        console.log(country.value)
        console.log(province.value)
        console.log(address.value)

        return
    }

    document.getElementById("step_1").style.display = "none"
    document.getElementById("step_2").style.display = "none"
    document.getElementById("step_3").style.display = ""

    document.getElementById("progress_step_1")
    document.getElementById("progress_step_2").classList.remove("text-blue-600", "dark:text-blue-500")
    document.getElementById("progress_step_3").classList.add("text-blue-600", "dark:text-blue-500")
})

document.getElementById("step_3_next_btn").addEventListener("click", ()=>{
    const defalut_topics = ["news", "sport","tech", "world", "finance", "politics", "business", "economics", "entertainment", "beauty", "travel", "music", "food", "science", "gaming", "energy"]
    let topics = []

    for(let x=0; x<16; x++) {
        console.log(`${defalut_topics[x]}-checkbox`)
        console.log(document.getElementById(defalut_topics[x] + "-checkbox").checked)
        if(document.getElementById(defalut_topics[x] + "-checkbox").checked === true) {
            topics.push(defalut_topics[x])
        };
    }

    if(topics.length < 4) {
        alert("select at least 4 topic")
        return
    }

    let user = new User(
        firstName.value,
        lastName.value,
        birthDate.value,
        email.value,
        sex.value,
        password.value,
        country.value,
        province.value,
        address.value,
        phone.value,
        new Array(language.value),
        topics,
    )
    console.log(topics)
    console.log(language.value)
    console.log(user)

    localStorage.setItem("user", JSON.stringify(user));
    location.href = "main_page.html"
})

