import { Guid } from "guid-typescript";
import { Matrix } from "../../utils/Matrix";
import { ChessPieceColor } from "./IChessPiece";
import Queen from "./Queen";

it('testing', () => {
    const matrix = new Matrix(1, 1);
    const queen = new Queen(Guid.create(), 0, 0, ChessPieceColor.White);

    const moves = queen.GetMoves(matrix);

    expect(moves.length).toBe(3);
});