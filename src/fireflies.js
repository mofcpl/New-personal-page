const random = (max, min) =>
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const easyInOutAnimation = (x) =>
{
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

class firefly
{
    constructor(posx, posy)
    {
        this.startX = posx;
        this.startY = posy;
        this.size = random(1, 4);
        this.brightness = random(0,100)/100
        this.destX = this.startX;
        this.destY = this.startY;
        this.animStart = 0;
        this.animTime = 0;
        this.pauseTime = 0;
    }

    run(maxX, maxY)
    {
        let x, y;

        //Ruch 
        if(this.stopTime > 0)
        {
            console.log("STOP")
            //Jeśli pauza się nie skończyła
            if((Date.now - this.animStart) < this.stopTime)
            {
                x = this.startX;
                y = this.startY;
            }
            //zakończ pauzę
            else
            {
                this.stopTime = 0;
                x = this.startX;
                y = this.startY;
            }
        }
        else if(this.startX == this.destX && this.startY == this.destY)
        {
            console.log("START")
            this.animStart = Date.now();
            this.animTime = random(1000,5000);

            this.destX += random(100, -100);
            this.destY += random(100, -100);

            if(this.destX < 0) this.destX *= 1;
            if(this.destX > maxX) this.destX = maxX;
            if(this.destY < 0) this.destY = 0;
            if(this.destY > maxY) this.destY = maxY;

            x = this.startX;
            y = this.startY;

        }
        else
        {
            console.log("MOVE");
            //Odległość od punktu początkowego do celu
            const xLength = this.destX - this.startX;
            const yLength = this.destY - this.startY;
            
            //Delta czasu
            const deltaTime = (Date.now() - this.animStart) / this.animTime;

            //Jaka część trasy została pokonana
            const part = easyInOutAnimation(deltaTime);

            //Zakończenie ruchu i ustawienie pauzy
            if(deltaTime > 1 ) 
            {
                this.stopTime = random(1,3);
                this.animStart = Date.now;
                this.startX = this.destX;
                this.startY = this.destY;
            }

            //Nowa pozycja
            x = this.startX + xLength * part;
            y = this.startY + yLength * part;

            
            
            

            console.log("Position: "+this.startX+", "+this.startY);
            console.log("Destination: "+this.destX+", "+this.destY);
            console.log("Distance: "+xLength+", "+yLength);
            console.log("Delta time: "+deltaTime);
            console.log("part: "+part);
            console.log("New position: "+x+", "+y);
            
        }

        return {x, y}

    }
}

class world
{
    constructor(selector)
    {
        const canvas = document.querySelector(selector);
        this.ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        this.width = canvas.width;
        this.height = canvas.height;
        this.amount =  Math.ceil((this.width+this.height)/200)
        this.firefliesList = [];
    }

    grow()
    {
        for(let i = 0; i < this.amount; i++)
        {
            this.firefliesList[i] = new firefly(random(0,this.width),random(0,this.height));
        }
    }

    drawFirefly(x, y)
    {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI*2);
        this.ctx.closePath();
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 20)
        gradient.addColorStop(0, 'rgba(210, 255, 77,1)');
        gradient.addColorStop(0.05, 'rgba(210, 255, 77,1)');
        gradient.addColorStop(0.15, 'rgba(210, 255, 77,0.2)');
        gradient.addColorStop(1, 'rgba(210, 255, 77,0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
       
    }


    render()
    {
        this.ctx.clearRect(0, 0, this.width,this.height);
        for(let i = 0; i < this.amount; i++)
        {
            const pos = this.firefliesList[i].run(this.width,this.height);
            this.drawFirefly(pos.x,pos.y);
        }
    }
    run()
    {
        setInterval(() => {this.render()},10);
        this.render();
        setTimeout(() => {this.render()},500);
        setTimeout(() => {this.render()},1000);
        setTimeout(() => {this.render()},1500);
        setTimeout(() => {this.render()},2000);
        setTimeout(() => {this.render()},2500);
    }
}

export {world}