class Balance
{   constructor()
    {   this.x = canvas.width/2;
        this.radius = canvas.width/2;
        this.y = canvas.height-this.radius;
        this.angle = 0;
        this.massCenter;
        this.torqueTotal = 0;
    }
    draw()
    {   context.fillStyle = "Cyan";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0+(Math.PI/180*this.angle), Math.PI+(Math.PI/180*this.angle), 0)
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
        }
        else
        {   if(Math.trunc(this.angle) != 0)
            {   this.angle += this.angle*-1/20;    
            }
            else
            {   this.angle = 0;
            }
        }
    }

    centerMass() {
        this.torqueTotal = 0;
    
        for (let i = 0; i < pieces.length; i++) {
            if(pieces[i].state)
            {   let distance = Math.ceil((pieces[i].x + pieces[i].width/2) / (canvas.width / 20)) - 11;
                let totalMass = 0;
                for (let i2 = 0; i2 < pieces[i].list.length; i2++) {
                    totalMass += pieces[i].list[i2].mass;
                }
                this.torqueTotal += totalMass * gravity * distance;
            }
        }
        this.massCenter = this.torqueTotal;
    }
    
}
