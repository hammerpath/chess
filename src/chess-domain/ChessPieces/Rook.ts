import { Guid } from "guid-typescript";
import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class Rook implements IChessPiece {
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

    GetMoves(maxWidth: number, maxDepth: number): Array<Array<number>> {
        let moves = Array<Array<number>>();

        const depthPositiveEnumerations = maxDepth - this.CurrentDepth;
        const depthNegativeEnumerations = this.CurrentDepth;
        const widthPositiveEnumerations = maxWidth - this.CurrentWidth;
        const widthNegativeEnumerations = this.CurrentWidth;

        //positive depth
        for(let i = 1; i <= depthPositiveEnumerations; i++){
            moves[this.CurrentWidth] = [this.CurrentDepth + i];
        }

        //negative depth
        for(let i = 1; i <= depthNegativeEnumerations; i++){
            moves[this.CurrentWidth] = [this.CurrentDepth - i];
        }

        //positive width
        for(let i = 1; i <= widthPositiveEnumerations; i++){
            moves[this.CurrentWidth + i] = [this.CurrentDepth]
        }

        //negative width
        for(let i = 1; i <= widthNegativeEnumerations; i++){
            moves[this.CurrentWidth - i] = [this.CurrentDepth];
        }

        return moves;
    }

    constructor(
        private id: Guid,
        private startWidth: number,
        private startDepth: number,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) { }
}