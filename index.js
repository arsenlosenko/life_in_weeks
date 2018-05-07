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
            if (this.canDraw){ 
                var rect = this.canvas.getBoundingClientRect();
                var pos = { 
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top 
                }
                var posx = pos.x;
                var posy = pos.y;
                var point = [posx,posy];
                var matchPoints = this.gridPoints.find(function (x) { 
                                                    return (
                                                            (point[0] > x[0] && point[0] < (x[0] + 10)) 
                                                            && (point[1] > x[1] && point[1] > (x[1]  + 10)) 
                                                        )});
                if(matchPoints){
                    this.ctx.fillStyle = this.lineFill;
                    this.ctx.fillRect(posx, posy,  20, 20);
                }
            }
        });
    }

    drawWeekGrid(ctx){
        var gridPoints = [];
        for(var x = 10; x <= 520; x+= 10){ 
           ctx.fillText(x/10, x * 2, 10);
           for(var y = 10; y <= 900; y += 10){
                  var gridPoint = [x * 2, y * 2];
                  ctx.fillText(y/10, 5, y*2);
                  ctx.strokeRect(x * 2, y * 2, 10, 10); 
                  gridPoints.push(gridPoint);
              }
         }
        return gridPoints;
    }
    

}

document.addEventListener('DOMContentLoaded', new CanvasConfig());
