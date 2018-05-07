class CanvasConfig {
    constructor () {
        this.canvas = document.getElementById('tutorial');
        this.colorPicker = document.getElementById('colorPicker');
        this.ctx = this.canvas.getContext('2d');
        this.lineFill = '#000000';
        this.gridPoints = this.drawWeekGrid(this.ctx);
        this.canDraw = false;
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
            this.draw(e);
        });
    }

    getMousePos(e){
        let rect = this.canvas.getBoundingClientRect();
        return { 
            x: e.clientX - rect.left,
            y: e.clientY - rect.top 
        }
    }


    draw(e){ 
        if (this.canDraw){ 
            let pos = this.getMousePos(e);
            let posx = pos.x;
            let posy = pos.y;
            let point = [posx,posy];
            let matchPoints = this.gridPoints.find(function (x) { 
                                                return (
                                                        (point[0] > (x[0] - 10) && point[0] < (x[0] + 10)) 
                                                        && (point[1] > (x[1] - 10) && point[1] > (x[1]  + 10)) 
                                                    )});
            if(matchPoints){
                this.ctx.fillStyle = this.lineFill;
                this.ctx.fillRect(posx, posy,  20, 20);
            }
        }
    }

    drawWeekGrid(ctx){
        let gridPoints = [];
        for(let x = 10; x <= 520; x+= 10){ 
           ctx.fillText(x/10, x * 2, 10);
           for(let y = 10; y <= 900; y += 10){
                  let gridPoint = [x * 2, y * 2];
                  ctx.fillText(y/10, 5, y*2);
                  ctx.strokeRect(x * 2, y * 2, 10, 10); 
                  gridPoints.push(gridPoint);
              }
         }
        return gridPoints;
    }
    

}

document.addEventListener('DOMContentLoaded', new CanvasConfig());
