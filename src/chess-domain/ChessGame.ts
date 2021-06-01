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

        const slicedMoves = this.sliceImpossibleMoves(moves, chessPiece, this.matrix);

        return slicedMoves.filter(move =>
            //filter out diagonal moves for pawn if no opposite colors are at diagonal places
            this.excludeCatchMovesForPawn(move, chessPiece, this.matrix));
    }

    private sliceImpossibleMoves(positions: Array<Position>, chessPiece: IChessPiece, matrix: IMatrix): Array<Position> {

        const sameColorChessPieces = this.chessPieces.filter(cp =>
            !cp.Id.equals(chessPiece.Id)
            && cp.Color === chessPiece.Color)
            .map(cp => new Position(cp.X, cp.Y));

        const opposingColorChessPieces = this.chessPieces.filter(cp =>
            cp.Color !== chessPiece.Color)
            .map(cp => new Position(cp.X, cp.Y));

        return matrix.getPositionsUntilConflicts(new Position(chessPiece.X, chessPiece.Y), positions, sameColorChessPieces)
            .filter((n, i) => matrix.getPositionsIncludingConflicts(new Position(chessPiece.X, chessPiece.Y), positions, opposingColorChessPieces).indexOf(n) === i);
    }

    private excludeCatchMovesForPawn(position: Position, chessPiece: IChessPiece, matrix: IMatrix): boolean {
        if (chessPiece instanceof Pawn) {

            const pawn = chessPiece as Pawn;

            //position does not contain a pawn catch move
            if (!pawn.GetCatchMoves(matrix).some(cm => cm.X === position.X && cm.Y === position.Y)) {
                return true;
            }

            const opposingColorInCatchRange = this.ChessPieces.some(
                cp => cp.X === position.X
                    && cp.Y === position.Y
                    && cp.Color !== chessPiece.Color);

            return opposingColorInCatchRange;
        }

        return true;
    }

    constructor(private id: Guid, private matrix: IMatrix, private chessPieces: Array<IChessPiece>) {
        this.chessBoard = new ChessBoard(Guid.create(), matrix);
    }

}