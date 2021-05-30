import { Guid } from "guid-typescript";
import { Matrix } from "../../utils/Matrix";
import { ChessPieceColor } from "./IChessPiece";
import Knight from "./Knight";

it('can not move within 4 space matrix', () => {
    const matrix = new Matrix(1, 1);
    const knight = new Knight(Guid.create(), 0, 0, ChessPieceColor.White);

    const moves = knight.GetMoves(matrix);

    expect(moves.length).toBe(0);
});

it('can move one position with a height of 2', () => {
    const matrix = new Matrix(1, 2);
    const knight = new Knight(Guid.create(), 0, 0, ChessPieceColor.White);

    const moves = knight.GetMoves(matrix);

    expect(moves.length).toBe(1);
});