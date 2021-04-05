import { ChessPieceType } from "../domain/enums/ChessPieceType";
import { Color } from "../domain/enums/Color";
import ChessPiece from "../domain/ChessPiece";
import ChessPiecePosition from "../domain/ChessPiecePosition";
import ChessPieceViewModel from "./ChessPieceViewModel";

import blackPawn from "../img/bP.png";
import whitePawn from "../img/wP.png";
import blackKnight from "../img/bN.png"
import whiteKnight from "../img/wN.png";
import blackBishop from "../img/bB.png";
import whiteBishop from "../img/wB.png";
import blackRook from "../img/bR.png";
import whiteRook from "../img/wR.png";
import blackQueen from "../img/bQ.png";
import whiteQueen from "../img/wQ.png";
import blackKing from "../img/bK.png";
import whiteKing from "../img/wK.png";


const icons = {
    pawn: {
        black: blackPawn,
        white: whitePawn
    },
    knight: {
        black: blackKnight,
        white: whiteKnight
    },
    bishop: {
        black: blackBishop,
        white: whiteBishop
    },
    rook: {
        black: blackRook,
        white: whiteRook
    },
    queen: {
        black: blackQueen,
        white: whiteQueen
    },
    king: {
        black: blackKing,
        white: whiteKing
    }
}

export default abstract class ChessPieceUtils {

    public static getIcon = (chessPieceType: ChessPieceType, color: Color): string => {

        switch (chessPieceType) {

            case ChessPieceType.Pawn:
                return color === Color.Black ? icons.pawn.black : icons.pawn.white;

            case ChessPieceType.Knight:
                return color === Color.Black ? icons.knight.black : icons.knight.white;

            case ChessPieceType.Bishop:
                return color === Color.Black ? icons.bishop.black : icons.bishop.white;

            case ChessPieceType.Rook:
                return color === Color.Black ? icons.rook.black : icons.rook.white;

            case ChessPieceType.Queen:
                return color === Color.Black ? icons.queen.black : icons.queen.white;

            case ChessPieceType.King:
                return color === Color.Black ? icons.king.black : icons.king.white;

            default:
                throw new Error("Chess piece type is not implemented")
        }
    }

    public static convertToChessPieceViewModels = (chessPieces: ChessPiece[], chessPiecePositions: ChessPiecePosition[]): ChessPieceViewModel[] => {
        const chessPieceViewModels = chessPiecePositions.map(chessPiecePosition => {
            const chessPiece = chessPieces.find(chessPiece => chessPiece.Id === chessPiecePosition.PieceId);

            if (chessPiece) {
                return new ChessPieceViewModel(chessPiecePosition.PieceId, chessPiece.Color, chessPiece.GamePieceType, chessPiecePosition.X, chessPiecePosition.Y);
            }

            throw new Error(`Cannot find chess piece with id: ${chessPiecePosition.PieceId}`);
        });

        return chessPieceViewModels;
    }

}
