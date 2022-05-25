class Ray
{
    constructor(pos, angle)
    {
        this.pos =
        {
            x: pos.x,
            y: pos.y
        }
        this.dir =
        {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    }

    setDir(x, y)
    {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir = this.vector_normalize(this.dir);
    }

    vector_magnitude(vector)
    {
        return Math.sqrt(vector.x**2 + vector.y**2);
    }

    vector_normalize(vector)
    {
        var mag = this.vector_magnitude(vector);
        if(mag != 0)
        {
            vector.x /= mag;
            vector.y /= mag;
        }

        return vector;

    }

    draw(stroke)
    {
        ctx.beginPath();
        ctx.strokeStyle = stroke;
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.dir.x, this.pos.y + this.dir.y);
        ctx.closePath();
        ctx.stroke();
    }

    cast(boundary)
    {
        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if(denominator == 0)
        {
            return;
        }

        const t_numerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
        const t = t_numerator / denominator;

        const u_numerator = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3));
        const u = u_numerator / denominator;

        if(t > 0 && t < 1 && u > 0)
        {
            const pt =
            {
                x: x1 + t * (x2 - x1),
                y: y1 + t * (y2 - y1)
            }
            return pt;
        }
        else
        {
            return;
        }
    }
}