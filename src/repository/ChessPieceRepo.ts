import { Guid } from "guid-typescript";
import { ChessPieceType } from "../domain/enums/ChessPieceType";
import { Color } from "../domain/enums/Color";
import ChessPiece from "../domain/ChessPiece";

export default class ChessPieceRepo {
    public Get = (): ChessPiece[] => {
        let chessPieces = new Array<ChessPiece>();

        //add pawns
        for (let i = 0; i <= 7; i++) {
            chessPieces.push(new ChessPiece(Guid.create(), Color.Black, ChessPieceType.Pawn));
            chessPieces.push(new ChessPiece(Guid.create(), Color.White, ChessPieceType.Pawn));
        }

        //add knights
        for (let i = 0; i < 2; i++) {
            chessPieces.push(new ChessPiece(Guid.create(), Color.Black, ChessPieceType.Knight));
            chessPieces.push(new ChessPiece(Guid.create(), Color.White, ChessPieceType.Knight));
        }

        //add bishops
        for (let i = 0; i < 2; i++) {
            chessPieces.push(new ChessPiece(Guid.create(), Color.Black, ChessPieceType.Bishop));
            chessPieces.push(new ChessPiece(Guid.create(), Color.White, ChessPieceType.Bishop));

        }

        //add rooks
        for (let i = 0; i < 2; i++) {
            chessPieces.push(new ChessPiece(Guid.create(), Color.Black, ChessPieceType.Rook));
            chessPieces.push(new ChessPiece(Guid.create(), Color.White, ChessPieceType.Rook));

        }

        //add queens
        chessPieces.push(new ChessPiece(Guid.create(), Color.Black, ChessPieceType.Queen));
        chessPieces.push(new ChessPiece(Guid.create(), Color.White, ChessPieceType.Queen));

        //add kings
        chessPieces.push(new ChessPiece(Guid.create(), Color.Black, ChessPieceType.King));
        chessPieces.push(new ChessPiece(Guid.create(), Color.White, ChessPieceType.King));

        return chessPieces;
    }
}