function setCanvas() {
    var canvas = document.getElementById('tutorial');
    var colorPicker = document.getElementById('colorPicker');
    var ctx = canvas.getContext('2d');
    var lineFill = '#000000';
    var gridPoints = drawWeekGrid(ctx);
    var canDraw = false;

    canvas.addEventListener('mousedown', function() {
        canDraw = true;
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', function () {
        canDraw = false;
    });
    colorPicker.addEventListener('change', function(e) {
        lineFill = e.target.value;
    }) 

    function draw(e) {
        if (canDraw){ 
            var pos = getMousePos(canvas, e);
            var posx = pos.x;
            var posy = pos.y;
            var point = [posx,posy];
            var matchPoints = gridPoints.find(function (x) { 
                                                return (
                                                        (point[0] > x[0] && point[0] < (x[0] + 10)) 
                                                        && (point[1] > x[1] && point[1] > (x[1]  + 10)) 
                                                    )});
            if(matchPoints){
                ctx.fillStyle = lineFill;
                ctx.fillRect(posx, posy,  20, 20);
            }
        }
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
}


function drawWeekGrid(ctx){
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


document.addEventListener('DOMContentLoaded', setCanvas);
