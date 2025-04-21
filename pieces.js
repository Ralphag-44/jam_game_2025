let squareP;
class Square
{   constructor(x, y)
    {   this.x = x;
        this.y = y;
        this.width = squareP;
        this.height = squareP;
        this.mass = 1;
    }
    draw(color)
    {   context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    translate(dx, dy)
    {   this.x += dx;
        this.y += dy;
    }

}

class Piece
{   constructor(type)
    {   this.x = squareP*Math.trunc(Math.random()*19);
        this.y = 0;
        this.timer = 0;
        this.state = false;
        switch(type)
        {   case 0:
                this.list = [new Square(this.x, this.y), new Square(this.x+squareP, this.y), new Square(this.x, this.y+squareP), new Square(this.x+squareP, this.y+squareP)];
                this.color = "yellow";
                this.width = squareP*2;
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
    }
    draw()
    {   for(let i = 0; (i < this.list.length); i++)
        {   this.list[i].draw(this.color);
        }
    }

}
