import { Guid } from "guid-typescript";

export default interface IChessPiece {
    readonly Id: Guid;
    readonly StartWidth: number;
    readonly StartDepth: number;
    readonly CurrentDepth: number;
    readonly CurrentWidth: number;
    readonly Color: ChessPieceColor;

    GetMoves(maxWidth: number, maxDepth: number) : Array<Array<number>>;
}

export enum ChessPieceColor {
    White,
    Black
}