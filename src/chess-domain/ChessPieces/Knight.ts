import { Guid } from "guid-typescript";
import { Direction, IMatrix } from "../../utils/Matrix";
import Position from "../Position";
import IChessPiece, { ChessPieceColor } from "./IChessPiece";

export default class Knight implements IChessPiece {
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

    private get directions(): Array<Array<Direction>> {
        return new Array<Array<Direction>>(
            new Array<Direction>(
                Direction.Up,
                Direction.Up,
                Direction.Right
            )
        );
    }

    GetMoves(matrix: IMatrix): Array<Position> {

        let moves = new Array<Position>();

        this.directions.forEach(directions => {
            const [position] = matrix.getPositionsBasedOnDirection(this.CurrentWidth, this.CurrentDepth, directions).slice(-1);

            if (position) {
                moves.push(position);
            }
        });

        return moves;
    }

    constructor(
        private id: Guid,
        private currentDepth: number,
        private currentWidth: number,
        private color: ChessPieceColor) { }
}