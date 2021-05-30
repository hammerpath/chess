import { Guid } from "guid-typescript";
import { Matrix } from "../../utils/Matrix";
import { ChessPieceColor } from "./IChessPiece";
import King from "./King";

it('can move to 3 positions with 4 space matrix', () => {
    const matrix = new Matrix(1, 1);
    const king = new King(Guid.create(), 0, 0, 0, 0, ChessPieceColor.Black);

    const moves = king.GetMoves(matrix);

    expect(moves.length).toBe(3);
});

it('can move to 3 positions with 9 space matrix', () => {
    const matrix = new Matrix(2, 2);
    const king = new King(Guid.create(), 0, 0, 0, 0, ChessPieceColor.Black);

    const moves = king.GetMoves(matrix);

    expect(moves.length).toBe(3);
});