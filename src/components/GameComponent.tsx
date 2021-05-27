import { Guid } from "guid-typescript";
import { useEffect, useState } from "react";
import ChessPieceUtils from "../application/ChessPieceUtils";
import ChessPieceViewModel from "../application/ChessPieceViewModel";
import Square from "../application/Square";
import ChessGame from "../domain/ChessGame";
import ChessGameConfig from "../domain/ChessGameConfig";
import ChessPiece from "../domain/ChessPiece";
import ChessPiecePosition from "../domain/ChessPiecePosition";
import ChessPieceRepo from "../repository/ChessPieceRepo";
import ChessBoardComponent from "./ChessBoardComponent";

interface IGameComponentProps {
    GameId?: Guid;
    config: ChessGameConfig;
    chessPieceRepo: ChessPieceRepo;
}

function GameComponent(props: IGameComponentProps) {

    const [chessPiecePositions, setChessPiecePositions] = useState<ChessPieceViewModel[]>([]);
    const [selectedChessPiece, setSelectedChessPiece] = useState<ChessPiecePosition>();
    const [chessGame, setChessGame] = useState<ChessGame>();

    useEffect(() => {
        initGame();
    }, []);

    const loadedChessGame = (gameId: Guid, chessPieces: ChessPiece[]): ChessGame => {
        //todo load from db
        let chessPiecePositions = new Array<ChessPiecePosition>();
        return new ChessGame(gameId, new ChessGameConfig(), chessPieces, chessPiecePositions);
    }

    const createNewChessGame = (gameId: Guid, chessPieces: ChessPiece[]): ChessGame => {
        return new ChessGame(gameId, new ChessGameConfig(), chessPieces);
    }

    const initGame = (): void => {
        let game: ChessGame;

        const pieces = props.chessPieceRepo.Get();

        if (props.GameId) {
            game = loadedChessGame(props.GameId, pieces);
        }
        else {
            game = createNewChessGame(Guid.create(), pieces);
        }

        //domain event for when a piece has moved
        game.OnChessPieceMoved.on((chessPiecePositions: ChessPiecePosition[]) => {
            setChessPiecePositions(ChessPieceUtils.convertToChessPieceViewModels(pieces, chessPiecePositions));
        });

        setChessPiecePositions(ChessPieceUtils.convertToChessPieceViewModels(pieces, game.ChessPiecePositions));
        setChessGame(game);
    }

    const selectSquare = (id: Guid | undefined, x: number, y: number) => {
        //move to new square
        if (selectedChessPiece && !id) {
            chessGame?.moveChessPiece(selectedChessPiece.PieceId, x, y);
            setSelectedChessPiece(undefined);
        }
        //select a new piece
        else if (id) {
            setSelectedChessPiece(new ChessPiecePosition(id, x, y));
        }
    };

    return (
        <div>
            <ChessBoardComponent
                squareSelected={selectSquare}
                width={props.config.Width}
                depth={props.config.Depth}
                squares={Square.getSquares(props.config.Width, props.config.Depth)}
                chessPieces={chessPiecePositions} />
        </div>
    );
}

export default GameComponent;