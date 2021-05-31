import { Guid } from "guid-typescript";
import { Matrix } from "../utils/Matrix";
import ChessGame from "./ChessGame";
import { ChessPieceColor } from "./ChessPieces/IChessPiece";
import Pawn from "./ChessPieces/Pawn";

describe('white pawn', () => {
    it('can move 2 positions with height of 2', () => {
        const pawnId = Guid.create();

        const matrix = new Matrix(1, 2);

        const pawns = new Array<Pawn>(
            new Pawn(pawnId, 0, 0, 0, 0, ChessPieceColor.White)
        );

        const game = new ChessGame(Guid.create(), matrix, pawns);

        const moves = game.GetMovement(pawnId);

        expect(moves.length).toBe(2);
    });

    it('cannot move with same color pawn in front', () => {
        const pawnId = Guid.create();

        const matrix = new Matrix(1, 2);

        const pawns = new Array<Pawn>(
            new Pawn(pawnId, 0, 0, 0, 0, ChessPieceColor.White),
            new Pawn(Guid.create(), 0, 1, 1, 0, ChessPieceColor.White)
        );

        const game = new ChessGame(Guid.create(), matrix, pawns);

        const moves = game.GetMovement(pawnId);

        expect(moves.length).toBe(0);
    });

    it('can move to 3 positions with height of 2 and black pawn to catch', () => {
        const pawnId = Guid.create();

        const matrix = new Matrix(1, 2);

        const pawns = new Array<Pawn>(
            new Pawn(pawnId, 0, 0, 0, 0, ChessPieceColor.White),
            new Pawn(Guid.create(), 1, 1, 1, 1, ChessPieceColor.Black)
        );

        const game = new ChessGame(Guid.create(), matrix, pawns);

        const moves = game.GetMovement(pawnId);

        expect(moves.length).toBe(3);
    });
});

describe('black pawn', () => {
    it('can move 2 positions with height of 2', () => {
        const pawnId = Guid.create();

        const matrix = new Matrix(1, 2);

        const pawns = new Array<Pawn>(
            new Pawn(pawnId, 0, 2, 2, 0, ChessPieceColor.Black)
        );

        const game = new ChessGame(Guid.create(), matrix, pawns);

        const moves = game.GetMovement(pawnId);

        expect(moves.length).toBe(2);
    });

    it('cannot move with same color pawn in front', () => {
        const pawnId = Guid.create();

        const matrix = new Matrix(1, 2);

        const pawns = new Array<Pawn>(
            new Pawn(pawnId, 0, 2, 2, 0, ChessPieceColor.Black),
            new Pawn(Guid.create(), 0, 1, 1, 0, ChessPieceColor.Black)
        );

        const game = new ChessGame(Guid.create(), matrix, pawns);

        const moves = game.GetMovement(pawnId);

        expect(moves.length).toBe(0);
    });

    it('can move to 3 positions with height of 2 and white pawn to catch', () => {
        const pawnId = Guid.create();

        const matrix = new Matrix(1, 2);

        const pawns = new Array<Pawn>(
            new Pawn(pawnId, 0, 2, 2, 0, ChessPieceColor.Black),
            new Pawn(Guid.create(), 1, 1, 1, 1, ChessPieceColor.White)
        );

        const game = new ChessGame(Guid.create(), matrix, pawns);

        const moves = game.GetMovement(pawnId);

        expect(moves.length).toBe(3);
    });
});