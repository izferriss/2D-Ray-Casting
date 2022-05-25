const canvas =
{
    w: window.innerWidth * .9,
    h: window.innerHeight  * .9,
    html: document.getElementById("canvas")
}

const ctx = canvas.html.getContext("2d");

const colors =
{
    font: "#ffffff",
    canvas_bg: "#000000",
    vector_stroke: "#ffffff",
    segment_intersect_fill: "#ffffff"
}

var fps =
{
    last: 0,
    now: 0,
    count_all: 0,
    count_curr: 0,
    delta: 0,
    rate: 0
}

var mousePos =
{
    x: 0,
    y: 0
};

document.addEventListener('mousemove', function(e)
{
    mousePos = getMousePos(canvas, e);
});

document.addEventListener('touchmove', function(e)
{
    mousePos = getTouchPos(canvas, e)
});

window.addEventListener('contextmenu', function (e)
{ 
    e.preventDefault(); 
}, false);


let walls = [];
let particle;
let pt;


window.onload = function()
{
    canvas.html.setAttribute("width", canvas.w);
    canvas.html.setAttribute("height", canvas.h);
    for(let i = 0; i < 5; i++)
    {
        walls.push(new Boundary(Math.random() * canvas.w, Math.random() * canvas.h, Math.random() * canvas.w, Math.random() * canvas.h))
    }
    walls.push(new Boundary(0, 0, canvas.w, 0, "outer"));
    walls.push(new Boundary(canvas.w, 0, canvas.w, canvas.h, "outer"));
    walls.push(new Boundary(canvas.w, canvas.h, 0, canvas.h, "outer"));
    walls.push(new Boundary(0, canvas.h, 0, 0, "outer"));
    particle = new Particle();
    loop(0);
}

//Main game Loop
function loop(time)
{
    calcFrameRate(time);
    update(fps.delta);
    draw();
    requestAnimationFrame(loop);
}

function draw()
{
    drawClearCanvas();
    drawCanvasBG();
    drawFPS();
    for(let wall of walls)
    {
        wall.draw();
    }
    particle.draw(walls);
    
}

function update(time)
{
    particle.update(mousePos.x, mousePos.y);
}

//Calculate the time between this frame and the last and provide FPS
function calcFrameRate(time)
{
    fps.now = performance.now();
    fps.delta = fps.now - fps.last;
    fps.rate = Math.round(1000 / fps.delta);

    fps.last = fps.now;

    fps.count_curr++;
    fps.count_all++;

    if(fps.now > 1000 + fps.last)
    {
        fps.rate = Math.round((fps.count_curr * 1000) / (fps.now - fps.last));
        fps.count_curr = 0;
        fps.last = fps.now; 
    }
}

//Clear canvas every frame
function drawClearCanvas()
{
    ctx.clearRect(0, 0, canvas.w, canvas.h);
}

//Fill in canvas bg
function drawCanvasBG()
{
    ctx.fillStyle = colors.canvas_bg;
    ctx.fillRect(0, 0, canvas.w, canvas.h);
}

function drawFPS()
{
    ctx.font = "14px Arial";
    ctx.fillStyle = colors.font;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("FPS: " + fps.rate, 2, 10);
}


//get mouse x/y position
function getMousePos(canvas, e) 
{
    var rect = canvas.html.getBoundingClientRect();
    return{x: e.clientX - rect.left, y: e.clientY - rect.top};
}

function getTouchPos(canvas, e) 
{
    var rect = canvas.html.getBoundingClientRect();
    return{x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top};
}

function drawCircle(x, y, radius, fill)
{
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.closePath();
}

function degToRad(degrees)
{
    return degrees * Math.PI / 180;
}
