import { Guid } from "guid-typescript";
import ChessBoard from "./ChessBoard";
import ChessGameConfig from "./ChessGameConfig";
import ChessPiecePosition from "./ChessPiecePosition";
import {ChessGameEvent} from "../events/Event";
import ChessPiece from "./ChessPiece";
import { Color } from "./enums/Color";
import { ChessPieceType } from "./enums/ChessPieceType";

export default class ChessGame {
    get Id() : Guid{
        return this.id;
    }

    get ChessPiecePositions() : ChessPiecePosition[]{
        return this._chessPiecePositions;
    }

    get ChessBoard() : ChessBoard{
        return this._chessBoard;
    }

    get OnChessPiecesPlaced(): ChessGameEvent<ChessPiecePosition[]> {
        return this._onChessPiecesPlaced;
    }

    get OnChessPieceMoved() : ChessGameEvent<ChessPiecePosition[]>{
        return this._onChessPieceMoved;
    }

    constructor(private id : Guid, config : ChessGameConfig, chessPieces: ChessPiece[], chessPiecePositions?: ChessPiecePosition[]){
        this._onChessPiecesPlaced = new ChessGameEvent<ChessPiecePosition[]>();
        this._onChessPieceMoved = new ChessGameEvent<ChessPiecePosition[]>();

        this._chessBoard = new ChessBoard(Guid.create(), config.Width, config.Depth);

        //init pieces if they aren't supplied
        if(!chessPiecePositions || (chessPiecePositions && chessPiecePositions.length === 0)){
            this._chessPiecePositions = this.initChessPieces(chessPieces);   
        }else{
            this._chessPiecePositions = chessPiecePositions;
        }
    }

    private initChessPieces = (chessPieces : ChessPiece[]) : ChessPiecePosition[] => {
        return this.placeChessPieces(chessPieces);
    }

    private placeChessPieces = (chessPieces : ChessPiece[]) : ChessPiecePosition[] => {
        let chessPiecePositions = new Array<ChessPiecePosition>();

        let chessPiecesCopy = [...chessPieces];

        for (let y = 0; y <= this.ChessBoard.Depth; y++) {

            for (let x = 0; x <= this.ChessBoard.Width; x++) {
                if (y === 0) {
                    if (x === 0 || x === 7) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.White && chessPiece.GamePieceType === ChessPieceType.Rook), 1)[0].Id, x, y));
                    } else if (x === 1 || x === 6) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.White && chessPiece.GamePieceType === ChessPieceType.Knight), 1)[0].Id, x, y))
                    } else if (x === 2 || x === 5) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.White && chessPiece.GamePieceType === ChessPieceType.Bishop), 1)[0].Id, x, y))
                    } else if (x === 3) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.White && chessPiece.GamePieceType === ChessPieceType.Queen), 1)[0].Id, x, y))
                    } else if (x === 4) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.White && chessPiece.GamePieceType === ChessPieceType.King), 1)[0].Id, x, y))
                    }
                } else if (y === 1) {
                    chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.White && chessPiece.GamePieceType === ChessPieceType.Pawn), 1)[0].Id, x, y))

                } else if (y === this.ChessBoard.Depth - 1) {
                    chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.Black && chessPiece.GamePieceType === ChessPieceType.Pawn), 1)[0].Id, x, y))

                } else if (y === this.ChessBoard.Depth) {
                    if (x === 0 || x === 7) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.Black && chessPiece.GamePieceType === ChessPieceType.Rook), 1)[0].Id, x, y))
                    } else if (x === 1 || x === 6) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.Black && chessPiece.GamePieceType === ChessPieceType.Knight), 1)[0].Id, x, y))
                    } else if (x === 2 || x === 5) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.Black && chessPiece.GamePieceType === ChessPieceType.Bishop), 1)[0].Id, x, y))
                    } else if (x === 3) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.Black && chessPiece.GamePieceType === ChessPieceType.King), 1)[0].Id, x, y))
                    } else if (x === 4) {
                        chessPiecePositions.push(new ChessPiecePosition(chessPiecesCopy.splice(chessPiecesCopy.findIndex(chessPiece => chessPiece.Color === Color.Black && chessPiece.GamePieceType === ChessPieceType.Queen), 1)[0].Id, x, y))
                    }
                }
            }
        }

        return chessPiecePositions;
    }
    

    moveChessPiece = (chessPieceId: Guid, x: number, y: number) : ChessPiecePosition => {
        const chessPiecePosition = new ChessPiecePosition(chessPieceId, x, y);

        //todo catch logic

        //removes the piece from the array
        this._chessPiecePositions = this.ChessPiecePositions.filter(el => el.PieceId !== chessPieceId);
        //adds the peice with its new position
        this._chessPiecePositions.push(chessPiecePosition);
        //emits moved event
        this._onChessPieceMoved.emit(this._chessPiecePositions);
        
        return chessPiecePosition;
    }

    private _chessPiecePositions: ChessPiecePosition[];
    private _chessBoard: ChessBoard;
    private _onChessPieceMoved : ChessGameEvent<ChessPiecePosition[]>;
    private _onChessPiecesPlaced : ChessGameEvent<ChessPiecePosition[]>;
}