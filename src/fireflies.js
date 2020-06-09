const MARGIN = 30;

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
        this.stopTime = 0;
        this.animTime = 0;
        this.pauseTime = 0;
        this.lightCycleTime = random(100,120)*1000;
        this.lightCycleStart = Date.now() - (random(0,120)*1000);
    }

    run(maxX, maxY)
    {
        let x, y, brightness;

        //MIGOTANIE
        
        const stage =  (Date.now() - this.lightCycleStart) / this.lightCycleTime;
        //console.log(stage);

        //Brak światła
        if(stage > 0 && stage < 0.5)
        {
            brightness = 0;
        }
        //Świecenie
        else if(stage < 1)
        {
            //Rozjaśnianie
            let part = undefined;
            if(stage < 0.75)
            {
                part = (stage-0.5)*4;
            }
            //Ściemnianie
            else
            {
                part = 1 - (stage-0.75)*4;
            }

            brightness = easyInOutAnimation(part);
        }
        //Restart cyklu
        else
        {
            this.lightCycleTime = random(100,120)*1000;
            this.lightCycleStart = Date.now();
            brightness = 0;
        }

        
        //RUCH
        if(this.stopTime > 0)
        {
            //Jeśli pauza się nie skończyła
            if((Date.now() - this.animStart) < this.stopTime)
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
            this.animStart = Date.now();
            this.animTime = random(2,6)*1000;

            this.destX += random(100, -100);
            this.destY += random(100, -100);

            if(this.destX < MARGIN) this.destX = this.startX + Math.abs(Math.abs(this.destX) - this.startX);
            if(this.destX > maxX-MARGIN) this.destX = this.startX - (this.destX - this.startX) ;
            if(this.destY < MARGIN) this.destY = this.startY + Math.abs(Math.abs(this.destY) - this.startY);
            if(this.destY > maxY-MARGIN) this.destY = this.startY - (this.destY - this.startY);

            x = this.startX;
            y = this.startY;

        }
        else
        {
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
                this.stopTime = random(0,3)*100;
                this.animStart = Date.now();
                this.startX = this.destX;
                this.startY = this.destY;
                x = this.startX;
                y = this.startY;
            }
            //Nowa pozycja
            else
            {
                x = this.startX + xLength * part;
                y = this.startY + yLength * part;
            }
            
        }

        return {x, y, brightness}

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
        this.amount = Math.ceil((this.width+this.height)/100)
        this.firefliesList = [];
    }

    grow()
    {
        for(let i = 0; i < this.amount; i++)
        {
            this.firefliesList[i] = new firefly(random(MARGIN,this.width-MARGIN),random(MARGIN,this.height-MARGIN));
        }
    }

    drawFirefly(x, y, brightness)
    {

        this.ctx.beginPath();
        this.ctx.arc(x, y, Math.round(10*brightness), 0, Math.PI*2);
        this.ctx.closePath();
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, Math.round(10*brightness))
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
            this.drawFirefly(pos.x, pos.y, pos.brightness);
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
        setTimeout(() => {this.render()},3000);
        setTimeout(() => {this.render()},3500);
        setTimeout(() => {this.render()},4000);
        setTimeout(() => {this.render()},4500);
        setTimeout(() => {this.render()},5000);

    }
}

export {world}