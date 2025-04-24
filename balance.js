class Balance
{   constructor()
    {   this.x = canvas.width/2;
        this.radius = canvas.width/2;
        this.y = canvas.height-this.radius;
        this.angle = 0;
        this.massCenter;
        this.torqueTotal = 0;
        this.points = [new Point(this.x-this.radius, this.y), new Point(this.x+this.radius, this.y)];
    }
    draw()
    {   context.fillStyle = "Cyan";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0+(Math.PI/180*this.angle), Math.PI+(Math.PI/180*this.angle), 0)
        context.closePath();
        context.fill();

        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.points[0].x, this.points[0].y, 5, 0, Math.PI*2, 0);
        context.arc(this.points[1].x, this.points[1].y, 5, 0, Math.PI*2, 0);
        context.closePath();
        context.fill();
        
    }
    update()
    {   this.centerMass();
        if(this?.massCenter)
        {   let limitador = 2;
            if(Math.abs(Math.trunc(this.angle)) == Math.abs(Math.trunc(this.torqueTotal*limitador)) && Math.sign(this.angle) == Math.sign(this.torqueTotal))
            {   this.angle = this.torqueTotal*limitador;
            }
            else
            {   if(Math.abs(this.angle) < Math.abs(this.torqueTotal*limitador))
                {   this.angle += this.torqueTotal/20;
                }
                else
                {   if(Math.sign(this.angle) == Math.sign(this.torqueTotal))
                    {   this.angle -= this.torqueTotal/20;
                    }
                    else
                    {   this.angle += this.torqueTotal/20;
                    }
                }
            }
            if(this.angle != this.points[0].angle)
            {   let center = {x: this.x, y: this.y};
                for(let i = 0; (i < this.points.length); i++)
                {   this.points[i].translate(-center.x, -center.y);
                    //this.points[i].rotate(this.angle+(this.points[i].angle*(i*2-1)));
                    this.points[i].rotate(i==0 ? this.angle-this.points[0].angle : this.angle+this.points[0].angle)
                    console.log(i*2-1, this.points[i].angle*(i*2-1), this.angle)
                    this.points[i].translate(center.x, center.y);
                }   
            }
        }
        else
        {   if(Math.trunc(this.angle) != 0)
            {   this.angle += this.angle*-1/20;    
            }
            else
            {   this.angle = 0;
            }
        }
        if(Math.abs(this.angle) > 35)
        {   window.location.reload();
        }
    }
    centerMass() {
        this.torqueTotal = 0;
        for (let i = 0; i < pieces.length; i++) {
            if(pieces[i].state)
            {   let distance = Math.ceil((pieces[i].x + pieces[i].width/2) / (canvas.width / 20)) - 11;
                this.torqueTotal += pieces[i].mass * gravity * distance;
            }
        }
        this.massCenter = this.torqueTotal;
    }
    
}
