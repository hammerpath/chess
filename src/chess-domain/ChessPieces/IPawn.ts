import IChessPiece from "./IChessPiece";

export default interface IPawn extends IChessPiece {
    readonly StartWidth: number;
    readonly StartDepth: number;
}