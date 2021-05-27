import { Guid } from "guid-typescript";
import ChessBoard from "./ChessBoard";
import IChessPiece from "./ChessPieces/IChessPiece";

export default class ChessGame {
    get Id(): Guid {
        return this.id;
    }

    get ChessBoard(): ChessBoard {
        return this.chessBoard;
    }

    get ChessPieces(): Array<IChessPiece> {
        return this.chessPieces;
    }

    public GetMovement(chessPieceId: Guid) : Array<Array<number>>{
        const chessPiece = this.ChessPieces.find(chessPiece => chessPiece.Id === chessPieceId);

        if(!chessPiece){
            throw new Error(`Cannot find chess piece with id ${chessPieceId}`);
        }

        //TODO filter out illegal moves
        return chessPiece.GetMoves(this.ChessBoard.Width, this.chessBoard.Depth);
    }

    constructor(private id: Guid, private chessBoard: ChessBoard, private chessPieces: Array<IChessPiece>) {

    }

}