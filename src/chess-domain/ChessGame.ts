import { Guid } from "guid-typescript";
import { type } from "node:os";
import { Direction, IMatrix } from "../utils/Matrix";
import ChessBoard, { IChessBoard } from "./ChessBoard";
import IChessPiece, { ChessPieceColor } from "./ChessPieces/IChessPiece";
import IPawn from "./ChessPieces/IPawn";
import Pawn from "./ChessPieces/Pawn";
import Position from "./Position";

export default class ChessGame {
    get Id(): Guid {
        return this.id;
    }

    get ChessPieces(): Array<IChessPiece> {
        return this.chessPieces;
    }

    get ChessBoard(): IChessBoard {
        return this.chessBoard;
    }

    private chessBoard: IChessBoard;

    public GetMovement(chessPieceId: Guid): Array<Position> {
        const chessPiece = this.ChessPieces.find(chessPiece => chessPiece.Id === chessPieceId);

        if (!chessPiece) {
            throw new Error(`Cannot find chess piece with id ${chessPieceId}`);
        }

        const moves = chessPiece.GetMoves(this.matrix);

        return moves.filter(move =>
            //filter out pieces with the same color that has the same position as a potential move
            this.excludeMovesWithSameColor(move, chessPiece)
            //filter out diagonal moves for pawn if no opposite colors are at diagonal places
            && this.excludeCatchMovesForPawn(move, chessPiece, this.matrix));
    }

    private excludeMovesWithSameColor(position: Position, chessPiece: IChessPiece): boolean {
        const test = !this.ChessPieces.some(cp =>
            cp.Color === chessPiece.Color
            && position.X === cp.X
            && position.Y === cp.Y);

        return test;
    }

    private excludeCatchMovesForPawn(position: Position, chessPiece: IChessPiece, matrix: IMatrix): boolean {
        if (chessPiece instanceof Pawn) {

            const pawn = chessPiece as Pawn;

            //position does not contain a pawn catch move
            if (!pawn.GetCatchMoves(matrix).some(cm => cm.X === position.X && cm.Y === position.Y)) {
                return true;
            }

            const test = this.ChessPieces.some(
                cp => cp.X === position.X 
                && cp.Y === position.Y 
                && cp.Color !== chessPiece.Color);

            return test;
        }

        return true;
    }

    constructor(private id: Guid, private matrix: IMatrix, private chessPieces: Array<IChessPiece>) {
        this.chessBoard = new ChessBoard(Guid.create(), matrix);
    }

}