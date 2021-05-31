import { IMatrix } from "../../utils/Matrix";
import Position from "../Position";
import IChessPiece from "./IChessPiece";

export default interface IPawn extends IChessPiece {
    readonly StartX: number;
    readonly StartY: number;

    GetCatchMoves(matrix: IMatrix): Array<Position>;
}