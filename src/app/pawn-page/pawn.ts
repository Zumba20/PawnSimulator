export class Pawn{
    public xPos:number;
    public yPos:number;
    public direction:number;
    public color:number;
    
    constructor(xPos:number,yPos:number,direction:number,color:number){
        this.xPos = xPos;
        this.yPos = yPos;
        this.direction = direction;
        this.color = color;
    }
}