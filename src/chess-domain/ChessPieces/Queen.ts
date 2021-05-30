import { Guid } from "guid-typescript";
import { IMatrix } from "../../utils/Matrix";
import Position from "../Position";
import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class Queen implements IChessPiece {
    get Id(): Guid {
        return this.id;
    }

    get Y(): number {
        return this.currentDepth;
    }

    get X(): number {
        return this.currentWidth;
    }

    get Color(): ChessPieceColor {
        return this.color;
    }

    GetMoves(matrix: IMatrix): Array<Position> {
        return matrix.getStraightLinesFromPoint(this.X, this.Y)
            .concat(matrix.getDiagonalLinesFromPoint(this.X, this.Y));
    }

    constructor(
        private id: Guid,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) { }
}