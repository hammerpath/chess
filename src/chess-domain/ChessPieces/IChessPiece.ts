import { Guid } from "guid-typescript";
import { IMatrix } from "../../utils/Matrix";
import Position from "../Position";

export default interface IChessPiece {
    readonly Id: Guid;
    readonly Y: number;
    readonly X: number;
    readonly Color: ChessPieceColor;

    GetMoves(matrix: IMatrix): Array<Position>;
}

export enum ChessPieceColor {
    White,
    Black
}