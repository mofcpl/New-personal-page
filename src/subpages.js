import {fadeOutDelete} from "./animations"

const loadingPage = document.querySelector(".loading");
const skillsPage = document.querySelector(".skills");
const projectsPage = document.querySelector(".projects");
const contactPage = document.querySelector(".contact");
const spinnerDiv = document.querySelector(".spinner")

//const bodySelector = document.querySelector("body");

skillsPage.remove();
projectsPage.remove();
contactPage.remove();

setTimeout( () =>
{
    const loading =  setInterval( () =>
    {
        if (document.readyState === "complete") 
        {
            spinnerDiv.remove();
            fadeOutDelete(1000, loadingPage);
            clearInterval(loading);
        }
    },10)
},500);


