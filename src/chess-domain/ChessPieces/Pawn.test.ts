import { Guid } from "guid-typescript";
import { Matrix } from "../../utils/Matrix";
import { ChessPieceColor } from "./IChessPiece";
import Pawn from "./Pawn";

describe('white pawn', () => {

    it('can move to 3 positions with height of 2', () => {
        const matrix = new Matrix(1, 2);
        const pawn = new Pawn(Guid.create(), 0, 0, 0, 0, ChessPieceColor.White);
    
        const moves = pawn.GetMoves(matrix);
    
        expect(moves.length).toBe(3);
    });
    
    it('can move to 3 positions with height of 3', () => {
        const matrix = new Matrix(1, 3);
        const pawn = new Pawn(Guid.create(), 0, 0, 0, 0, ChessPieceColor.White);
    
        const moves = pawn.GetMoves(matrix);
    
        expect(moves.length).toBe(3);
    });
});

describe('black pawn', () => {
    it('can move to 3 positions with height of 2', () => {
        const matrix = new Matrix(1, 2);
        const pawn = new Pawn(Guid.create(), 0, 2, 2, 0, ChessPieceColor.Black);
    
        const moves = pawn.GetMoves(matrix);
    
        expect(moves.length).toBe(3);
    });
    
    it('can move to 3 positions with height of 3', () => {
        const matrix = new Matrix(1, 3);
        const pawn = new Pawn(Guid.create(), 0, 3, 3, 0, ChessPieceColor.Black);
    
        const moves = pawn.GetMoves(matrix);
    
        expect(moves.length).toBe(3);
    });
});
