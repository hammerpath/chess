import { Guid } from "guid-typescript";
import { ChessPieceColor } from "./IChessPiece";
import Pawn from "./Pawn";

it('testing', () => {
    const pawn = new Pawn(Guid.create(), 0, 0, 0, 0, ChessPieceColor.White);

    const moves = pawn.GetMoves(1, 2);

    expect(moves.length === 17);
});