import { Guid } from "guid-typescript";
import { IMatrix } from "../../utils/Matrix";
import Position from "../Position";
import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class Bishop implements IChessPiece {
    get Id(): Guid {
        return this.id;
    }

    get CurrentDepth(): number {
        return this.currentDepth;
    }

    get CurrentWidth(): number {
        return this.currentWidth;
    }

    get Color(): ChessPieceColor {
        return this.color;
    }

    GetMoves(matrix: IMatrix): Array<Position> {
        return matrix.getDiagonalLinesFromPoint(this.CurrentWidth, this.CurrentDepth);
    }

    constructor(
        private id: Guid,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) { }
}