import { useCallback, useEffect, useState } from "react";
import GridPosition from "../application/GridPosition";
import ChessGameConfig from "../domain/ChessGameConfig";
import ChessPiecePosition from "../domain/ChessPiecePosition";
import '../ChessBoard.css';
import ChessPiece from "../domain/ChessPiece";
import ChessPieceUtils from "../application/ChessPieceUtils";
import ChessPieceViewModel from "../application/ChessPieceViewModel";
import ChessPieceComponent from "./ChessPieceComponent";
import { Guid } from "guid-typescript";

interface IChessBoardComponentProps {
    chessPieces: ChessPieceViewModel[];
    squares: Array<Array<number>>;
    width: number;
    depth: number;
    squareSelected: (id: Guid | undefined, x: number, y: number) => void;
}

function ChessBoardComponent(props: IChessBoardComponentProps) {

    const findByPosition = (x: number, y: number): ChessPieceViewModel | undefined => {
        return props.chessPieces.find(chessPiece => chessPiece.X === x && chessPiece.Y === y);
    }

    const renderChessPiece = (chessPiece: ChessPieceViewModel) => {
        return (
            <ChessPieceComponent color={chessPiece.Color} chessPieceType={chessPiece.ChessPieceType}></ChessPieceComponent>
        );
    }

    const renderSquare = (x: number, y: number) => {
        const chessPiece = findByPosition(x, y);

        return (
            <td key={y.toString() + x.toString()} onClick={() => props.squareSelected(chessPiece?.PieceId, x, y)}>
                {chessPiece ? renderChessPiece(chessPiece) : null}
            </td>
        )
    }

    return (
        <table>
            <tbody>
                {props.squares.map((rows, y) => {
                    return (
                        <tr key={props.depth - y}>
                            {rows.map(x =>
                                renderSquare(x, props.depth - y)
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default ChessBoardComponent;