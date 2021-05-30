import { Guid } from "guid-typescript";
import { IMatrix } from "../../utils/Matrix";
import Position from "../Position";
import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class King implements IChessPiece {
    get Id(): Guid {
        return this.id;
    }

    get StartWidth(): number {
        return this.startWidth;
    }

    get StartDepth(): number {
        return this.startDepth;
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
        return matrix.getStraightLinesFromPoint(this.CurrentWidth, this.CurrentDepth, 1)
            .concat(matrix.getDiagonalLinesFromPoint(this.CurrentWidth, this.CurrentDepth, 1));
    }

    constructor(
        private id: Guid,
        private startWidth: number,
        private startDepth: number,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) { }
}