import { Guid } from "guid-typescript";
import { Matrix } from "../../utils/Matrix";
import { ChessPieceColor } from "./IChessPiece";
import Rook from "./Rook";

it('testing', () => {
    const matrix = new Matrix(1, 1);
    const rook = new Rook(Guid.create(), 0, 0, 0, 0, ChessPieceColor.White);

    const moves = rook.GetMoves(matrix);

    expect(moves.length).toBe(2);
});