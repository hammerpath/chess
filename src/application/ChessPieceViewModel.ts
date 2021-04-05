import { Guid } from "guid-typescript";
import { ChessPieceType } from "../domain/enums/ChessPieceType";
import { Color } from "../domain/enums/Color";

export default class ChessPieceViewModel {

    get PieceId() : Guid{
        return this.id;
    }

    get Color(): Color {
        return this.color;
    }

    get ChessPieceType(): ChessPieceType {
        return this.chessPieceType;
    }

    get X(): number {
        return this.x;
    }

    get Y(): number {
        return this.y;
    }

    constructor(
        private id: Guid,
        private color: Color,
        private chessPieceType: ChessPieceType,
        private x: number,
        private y: number) {}
}