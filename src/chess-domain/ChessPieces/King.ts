import { Guid } from "guid-typescript";
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

    GetMoves(maxWidth: number, maxDepth: number): Array<Array<number>> {
        let moves = Array<Array<number>>();

        const depthPositiveEnumerations = maxDepth - this.CurrentDepth > 0 ? 1 : 0;
        const depthNegativeEnumerations = this.CurrentDepth > 0 ? 1 : 0;
        const widthPositiveEnumerations = maxWidth - this.CurrentWidth > 0 ? 1 : 0;
        const widthNegativeEnumerations = this.CurrentWidth > 0 ? 1 : 0;

        //#region straight moves

        //positive depth
        for (let i = 1; i <= depthPositiveEnumerations; i++) {
            moves[this.CurrentWidth] = [this.CurrentDepth + i];
        }

        //negative depth
        for (let i = 1; i <= depthNegativeEnumerations; i++) {
            moves[this.CurrentWidth] = [this.CurrentDepth - i];
        }

        //positive width
        for (let i = 1; i <= widthPositiveEnumerations; i++) {
            moves[this.CurrentWidth + i] = [this.CurrentDepth]
        }

        //negative width
        for (let i = 1; i <= widthNegativeEnumerations; i++) {
            moves[this.CurrentWidth - i] = [this.CurrentDepth];
        }

        //#endregion

        //#region diagonal moves

        //x + 1 & y + 1
        for (let i = 1; i <= depthPositiveEnumerations && i <= widthPositiveEnumerations; i++) {
            moves[this.CurrentWidth + i] = [this.CurrentDepth + i];
        }

        //x + 1 & y - 1
        for (let i = 1; i <= depthNegativeEnumerations && i <= widthPositiveEnumerations; i++) {
            moves[this.CurrentWidth + i] = [this.CurrentDepth - i];
        }

        //x - 1 & y - 1
        for (let i = 1; i <= depthNegativeEnumerations && i <= widthNegativeEnumerations; i++) {
            moves[this.CurrentWidth - i] = [this.CurrentDepth - i];
        }

        //x - 1 & y + 1
        for (let i = 1; i <= depthPositiveEnumerations && i <= widthNegativeEnumerations; i++) {
            moves[this.CurrentWidth - i] = [this.CurrentDepth + i];
        }

        //#endregion

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