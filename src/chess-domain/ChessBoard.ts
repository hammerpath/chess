import { Guid } from "guid-typescript";

export default class ChessBoard{
    get Id() : Guid{
        return this.id;
    }

    get Width() : number{
        return this.width;
    }

    get Depth(): number{
        return this.depth;
    }
    
    constructor(private id: Guid, private width: number, private depth: number){

    }
}