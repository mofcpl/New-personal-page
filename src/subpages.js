
const loadingPage = document.querySelector(".loading");
const spinnerDiv = document.querySelector(".spinner")

const articles = document.querySelectorAll('.subpage')
const buttons = document.querySelectorAll(".navBtn");

const skills_icons = document.querySelectorAll(".skill-icon");
const skills_buttons = document.querySelectorAll(".skillsBtn");
const skills_parent = document.querySelector(".skills-parent");
const toRemove = document.querySelectorAll(".tool, .backend");


const navSelector = document.querySelector("nav");


//Loading screen
setTimeout( () =>
{
    const loading =  setInterval( () =>
    {
        if (document.readyState === "complete") 
        {
            spinnerDiv.remove();
            loadingPage.classList.add('hide');
            setTimeout( () => { loadingPage.remove()},501);
            clearInterval(loading);
        }
    },10)
},500);

//Changing pages
const toggleArticles = (art) => 
{
    articles.forEach((article) => {
      article.classList.value.includes(art)
        ? article.classList.add('show')
        : article.classList.remove('show')
    })
}
  
buttons.forEach((button) => 
{
    button.addEventListener('click', (e) => {
      toggleArticles(e.currentTarget.dataset.art)
    }, false)
})

//Scrolling shadow

const checkScrollPosition = (scroll, shadow) => 
{
    (scroll.scrollTop > 0) 
    ? shadow.classList.add('shadow') 
    : shadow.classList.remove('shadow')
}

articles.forEach((div) => 
{
    const scroll = div.querySelector(".scroll");
    const shadow = div.querySelector("header");
    
    scroll.addEventListener('scroll', (e) => {
        checkScrollPosition(scroll, shadow);
    }, false)
})

//quit buttons

articles.forEach((div) => 
{
    const btn = div.querySelector(".quitBtn");
    
    btn.addEventListener('click', (e) => 
    {
        div.classList.remove('show');
    }, false)
})

//skills menu

toRemove.forEach((icon) =>
{
    icon.remove();
})

let i = 0;

const toggleSkills = (art) => 
{

    i=0;
    skills_icons.forEach((icon,index) => {
        if(icon.classList.value.includes(art))
        {
            skills_parent.appendChild(icon);
            setTimeout(() =>
            {
                icon.classList.add('fade-out'); 
            },100*i);
            i++;
        }
        else
        {
            icon.classList.remove('fade-out');
            icon.remove();
        }
    })
}


skills_buttons.forEach((button) => 
{
    button.addEventListener('click', (e) => {
        toggleSkills(e.currentTarget.dataset.art)
    }, false)
})