class LifeCalendar {
    constructor () {
        this.canvas = document.getElementById('lifeCalendar');
        this.colorPicker = document.getElementById('colorPicker');
        this.ctx = this.canvas.getContext('2d');
        this.lineFill = '#000000';
        this.gridPoints = [];
        this.canDraw = false;
        this.drawWeekGrid();
        this.setDrawEvent()
        this.setColorPickerChange();
        this.drawOnGrid(); 
    }

    setColorPickerChange(){
        this.colorPicker.addEventListener('change', (e) => {
            this.lineFill = e.target.value;
        });
    }

    setDrawEvent(){
        this.canvas.addEventListener('mousedown', () => {
            this.canDraw = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            this.canDraw = false;
        });
    }

    drawOnGrid() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    }

    getMousePos(e){
        let rect = this.canvas.getBoundingClientRect();
        return { 
            x: e.clientX - rect.left,
            y: e.clientY - rect.top 
        }
    }

    matchPoints(posx, posy){
        return this.gridPoints.find((x) => {return (((x[0] - 10) < posx < (x[0] + 10)) && ((x[1] - 10)< posy <  (x[1]  + 10)))});
    }


    draw(pos){
        let roundedX = Math.round(pos.x / 10) * 10; 
        let roundedY = Math.round(pos.y / 10) * 10; 
        this.ctx.fillStyle = this.lineFill;
        this.ctx.fillRect(roundedX, roundedY,  20, 20);
    }

    getWeekInfo(pos){
        let week = Math.round(pos.x / 10) * 10;
        let year = Math.round(pos.y / 10) * 10;
    }


    handleMouseMove(e){ 
        let pos = this.getMousePos(e);
        if(this.matchPoints(pos.x, pos.y)){
            if(this.canDraw){
                this.draw(pos);
            }else{
                this.getWeekInfo(pos);
            }
        }
    }

    drawWeekGrid(){
        let weeksInYear = 52;
        let yearsInLife = 90;
        let pixelsPerSquare = 10;

        for(let x = 10; x <= (weeksInYear * pixelsPerSquare); x+= 10){ 
           this.ctx.fillText(x/10, x * 2, 10);
           for(let y = 10; y <= (yearsInLife * pixelsPerSquare); y += 10){
                  let gridPoint = [x * 2, y * 2];
                  this.ctx.fillText(y/10, 5, y*2);
                  this.ctx.strokeRect(x * 2, y * 2, 10, 10); 
                  this.gridPoints.push(gridPoint);
              }
         }
    }

}

document.addEventListener('DOMContentLoaded', new LifeCalendar());
