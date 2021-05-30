import IChessPiece from "./IChessPiece";

export default interface IPawn extends IChessPiece {
    readonly StartX: number;
    readonly StartY: number;
}