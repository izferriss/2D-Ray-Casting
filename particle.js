class Particle
{
    constructor()
    {
        this.pos =
        {
            x: canvas.w/2,
            y: canvas.h/2
        }
        this.rays = [];
        for(let a = 0; a < 360; a += 10)
        {
            this.rays.push(new Ray(this.pos, degToRad(a)));
        }
    }

    draw(walls)
    {
        for(let ray of this.rays)
        {
            let closest =
            {
                x: null,
                y: null
            };
            let distance =
            {
                x: null,
                y: null
            };
            let record = 
            {
                x: Infinity,
                y: Infinity
            };

            let stroke = null;

            for(let wall of walls)
            {
                const pt = ray.cast(wall);
                
                stroke = wall.color;

                if(pt)
                {
                    distance.x = Math.abs(this.pos.x - pt.x);
                    distance.y = Math.abs(this.pos.y - pt.y);

                    if(distance.x < record.x)
                    {
                        record.x = distance.x;
                        closest.x = pt.x;
                    }
                    if(distance.y < record.y)
                    {
                        record.y = distance.y;
                        closest.y = pt.y;
                    }
                }
            }
            if(closest.x != null && closest.y != null)
            {
                ctx.beginPath();
                ctx.strokeStyle = stroke;
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(closest.x, closest.y);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }

    update(x, y)
    {
        this.pos.x = x;
        this.pos.y = y;
        for(let ray of this.rays)
        {
            ray.pos = this.pos;
        }
    }

}