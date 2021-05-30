import { Guid } from "guid-typescript";
import { Direction, IMatrix } from "../../utils/Matrix";
import Position from "../Position";
import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class Pawn implements IChessPiece {
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
        if (this.StartDepth === this.CurrentDepth) {
            return matrix.getPositions(this.CurrentWidth, this.CurrentDepth, Direction.Up, 2);
        }

        return matrix.getPositions(this.CurrentWidth, this.CurrentDepth, Direction.Up, 1);
    }

    constructor(
        private id: Guid,
        private startWidth: number,
        private startDepth: number,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) { }
}