import { Guid } from "guid-typescript";
import { Matrix } from "../../utils/Matrix";
import Bishop from "./Bishop";
import { ChessPieceColor } from "./IChessPiece";

it('testing', () => {
    const matrix = new Matrix(1, 1);
    const bishop = new Bishop(Guid.create(), 0, 0, 0, 0, ChessPieceColor.Black);

    const moves = bishop.GetMoves(matrix);

    expect(moves.length).toBe(1);
});