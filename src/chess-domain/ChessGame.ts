import { Guid } from "guid-typescript";
import { IMatrix } from "../utils/Matrix";
import ChessBoard, { IChessBoard } from "./ChessBoard";
import IChessPiece from "./ChessPieces/IChessPiece";
import Position from "./Position";

export default class ChessGame {
    get Id(): Guid {
        return this.id;
    }

    get ChessPieces(): Array<IChessPiece> {
        return this.chessPieces;
    }

    get ChessBoard() : IChessBoard{
        return this.chessBoard;
    }

    private chessBoard : IChessBoard;

    public GetMovement(chessPieceId: Guid) : Array<Position>{
        const chessPiece = this.ChessPieces.find(chessPiece => chessPiece.Id === chessPieceId);

        if(!chessPiece){
            throw new Error(`Cannot find chess piece with id ${chessPieceId}`);
        }

        //TODO filter out illegal moves
        return chessPiece.GetMoves(this.matrix);
    }

    constructor(private id: Guid, private matrix: IMatrix, private chessPieces: Array<IChessPiece>) {
        this.chessBoard = new ChessBoard(Guid.create(), matrix);
    }

}