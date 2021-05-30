import { Guid } from "guid-typescript";
import { Direction, IMatrix } from "../../utils/Matrix";
import Position from "../Position";
import { ChessPieceColor } from "./IChessPiece";
import IPawn from "./IPawn";

export default class Pawn implements IPawn {
    get Id(): Guid {
        return this.id;
    }

    get StartX(): number {
        return this.startWidth;
    }

    get StartY(): number {
        return this.startDepth;
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
        switch (this.color) {
            case ChessPieceColor.White:
                if (this.StartY === this.Y) {
                    return matrix.getPositions(this.X, this.Y, Direction.Up, 2)
                        .concat(matrix.getPositions(this.X, this.Y, Direction.UpRight, 1))
                        .concat(matrix.getPositions(this.X, this.Y, Direction.UpLeft, 1));
                }

                return matrix.getPositions(this.X, this.Y, Direction.Up, 1)
                    .concat(matrix.getPositions(this.X, this.Y, Direction.UpRight, 1))
                    .concat(matrix.getPositions(this.X, this.Y, Direction.UpLeft, 1));

            case ChessPieceColor.Black:
                if (this.StartY === this.Y) {
                    return matrix.getPositions(this.X, this.Y, Direction.Down, 2)
                        .concat(matrix.getPositions(this.X, this.Y, Direction.DownRight, 1))
                        .concat(matrix.getPositions(this.X, this.Y, Direction.DownLeft, 1));
                }

                return matrix.getPositions(this.X, this.Y, Direction.Down, 1)
                    .concat(matrix.getPositions(this.X, this.Y, Direction.DownRight, 1))
                    .concat(matrix.getPositions(this.X, this.Y, Direction.DownLeft, 1));
            default:
                throw new Error('Not implemented');
        }
    }

    constructor(
        private id: Guid,
        private startWidth: number,
        private startDepth: number,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) { }
}