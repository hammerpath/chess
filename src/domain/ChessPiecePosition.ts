import { Guid } from "guid-typescript";

export interface IChessPiecePosition {
    readonly PieceId: Guid;
    readonly X: number;
    readonly Y: number;
}


export default class ChessPiecePosition implements IChessPiecePosition {

    get PieceId() : Guid{
        return this.pieceId;
    }

    get X(): number {
        return this.x;
    }

    get Y(): number {
        return this.y;
    }

    constructor(private pieceId: Guid, private x: number, private y: number) { }
}