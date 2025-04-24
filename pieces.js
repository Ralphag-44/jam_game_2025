let squareP;
class Point
{	constructor(x, y)
	{	this.x = x;
		this.y = y;
        this.angle = 0;
	}
	translate(dx, dy)
	{	this.x += dx;
		this.y += dy;
	}
	rotate(angle)
	{	this.angle += angle;
        angle *= Math.PI/180;
		let x = Math.cos(angle)*this.x-Math.sin(angle)*this.y;
		let y = Math.sin(angle)*this.x+Math.cos(angle)*this.y;
		this.x = x;
		this.y = y;
	}
}
class Piece
{   constructor(type)
    {   this.x = squareP*Math.trunc(Math.random()*19);
        this.y = 0;
        this.timer = 0;
        this.state = true;
        this.angle = 0;
        switch(type)
        {   case 0:
                this.width = squareP*2;
                this.height = squareP*2;
                this.list = [new Point(this.x, this.y), new Point(this.x+this.width, this.y), new Point(this.x+this.width, this.y+this.height), new Point(this.x, this.y+this.height)];
                this.color = "yellow";
                this.mass = 4;
            break;
        }
    }
    translate(dx, dy)
    {   for(let i = 0; (i < this.list.length); i++)
        {   this.list[i].translate(dx, dy);
        }
        this.x+=dx;
        this.y+=dy;
    }
    update()
    {   if(!this.state)
        {   this.timer++;
            if(this.timer == 30)
            {   this.translate(0, squareP);
                this.timer = 0;
            }
        }
        if(this.angle != balance.angle)
        {   this.rotate(balance.angle-this.angle);
            this.angle = balance.angle;
        }
    }
    draw()
    {   context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.list[0].x, this.list[0].y);
        for(let i = 0; (i < this.list.length); i++)
        {   context.lineTo(this.list[i].x, this.list[i].y);
        }
        context.closePath();
        context.fill();
    }
    rotate(angle)
    {   let center = {x: this.x+this.width/2, y: this.y+this.height/2};
        this.translate(-center.x, -center.y);
        for(let i = 0; (i < this.list.length); i++)
        {   this.list[i].rotate(angle);
        }
        this.angle += angle;
        this.translate(center.x, center.y);
    }
}
