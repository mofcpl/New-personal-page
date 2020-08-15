
const loadingPage = document.querySelector(".loading");
const spinnerDiv = document.querySelector(".spinner")

const articles = document.querySelectorAll('.subpage')
const buttons = document.querySelectorAll(".navBtn");

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

//Scrolling

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