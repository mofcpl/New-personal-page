const autoprefixer = require("autoprefixer");

const background = document.querySelector(".background");

const form = document.querySelector("form");

const response_success = document.querySelector(".response-success");
const response_failed = document.querySelector(".response-failed");

response_success.remove();
response_failed.remove();

const background_height = background.offsetHeight;
console.log(background_height);

form.addEventListener("submit",async e => 
{
    form.remove();
    e.preventDefault();

    try
    {
        const response = await fetch("https://postoffice.zbrogdom.pl",
        {
            headers: {"Content-type": "application/json; charset=UTF-8"},
            method: "post", 
            body: JSON.stringify({
                name: form.name.value,
                sender: form.sender.value,
                subject: form.subject.value,
                msg: form.msg.value
            })
        });

        const data = await response.json();

        if(!response.ok || data.error)
        {
            throw new Error(response.statusText);
        }
        else
        {
            background.appendChild(response_success);
        }
    }
    catch(err)
    {
        background.classList.add("small");
        background.appendChild(response_failed);
        setTimeout( () => 
        {
            response_failed.classList.add("show");
        },500);
    }
    


    
})