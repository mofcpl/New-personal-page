
const form = document.querySelector("form");

form.addEventListener("submit",async e => 
{
    e.preventDefault();

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
    console.log(data);
})