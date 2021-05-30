import { Guid } from "guid-typescript";
import { Matrix } from "../../utils/Matrix";
import { ChessPieceColor } from "./IChessPiece";
import Pawn from "./Pawn";

it('can move 2 steps with height of 2', () => {
    const matrix = new Matrix(1, 2);
    const pawn = new Pawn(Guid.create(), 0, 0, 0, 0, ChessPieceColor.White);

    const moves = pawn.GetMoves(matrix);

    expect(moves.length).toBe(2);
});

it('can move 2 steps with height of 3', () => {
    const matrix = new Matrix(1, 3);
    const pawn = new Pawn(Guid.create(), 0, 0, 0, 0, ChessPieceColor.White);

    const moves = pawn.GetMoves(matrix);

    expect(moves.length).toBe(2);
});