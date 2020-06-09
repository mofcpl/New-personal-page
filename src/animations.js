const fadeOutDelete = (time, div) =>
{
    const fadeOutTime = time;
    const startTime = Date.now();
    
    const loadingEnd = setInterval( () =>
    {
        const part = (Date.now() - startTime) / fadeOutTime;
        if (part >= 1) 
        {
            div.remove();
            clearInterval(loadingEnd);
        }

        div.style.opacity = 1 - part;
    },10)
}

export {fadeOutDelete}