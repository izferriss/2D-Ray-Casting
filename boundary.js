class Boundary
{
    constructor(x1, y1, x2, y2, type = "inner")
    {
        this.a = 
        {
            x: x1,
            y: y1
        }
        this.b = 
        {
            x: x2,
            y: y2
        }
        this.type = type;
        this.color;
    }

    draw()
    {
        ctx.beginPath();
        if(this.type == "inner")
        {
            this.color = colors.vector_stroke;
        }
        else
        {
            this.color = "red";
        }
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.closePath();
        ctx.stroke();
    }
}