import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class Knight implements IChessPiece{
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


        return moves;
    }

    constructor(
        private startWidth: number,
        private startDepth: number,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) {}
}