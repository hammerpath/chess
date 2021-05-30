import { Guid } from "guid-typescript";
import { IMatrix } from "../utils/Matrix";

export default class ChessBoard{
    get Id() : Guid{
        return this.id;
    }

    get Matrix(): IMatrix{
        return this.matrix;
    }
    
    constructor(private id: Guid, private matrix: IMatrix){

    }
}

export interface IChessBoard{
    readonly Id : Guid;
    readonly Matrix: IMatrix;
}