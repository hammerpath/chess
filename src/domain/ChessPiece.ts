import { Guid } from "guid-typescript";
import { Color } from "./enums/Color";
import { ChessPieceType } from "./enums/ChessPieceType";

export default class ChessPiece {
    get Id() : Guid{
        return this.id;
    }

    get Color() : Color{
        return this.color;
    }

    get GamePieceType() : ChessPieceType{
        return this.chessPieceType;
    }

    constructor(private id : Guid, private color: Color, private chessPieceType: ChessPieceType){

    }
}