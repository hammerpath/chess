import { Guid } from "guid-typescript";
import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class Pawn implements IChessPiece {
    get Id() : Guid{
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

    GetMoves(maxWidth: number, maxDepth: number): Array<Array<number>> {
        let moves = Array<Array<number>>();
        const enumerations = maxDepth - this.CurrentDepth < 2 ? maxDepth - this.CurrentDepth : 2;

        if (this.StartDepth === this.CurrentDepth) {
            for (let i = 1; i <= enumerations; i++) {
                moves[this.CurrentWidth] = [this.CurrentDepth + i];
            }
        } else if (enumerations > 0) {
            moves[this.CurrentWidth] = [this.CurrentDepth + 1];
        }

        return moves;
    }

    constructor(
        private id: Guid,
        private startWidth: number,
        private startDepth: number,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) {}
}