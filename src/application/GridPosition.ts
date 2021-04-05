import { Guid } from "guid-typescript";

export default class GridPosition {

    get Id(): Guid {
        return this.id;
    }

    get X(): number {
        return this.x;
    }

    get Y(): number {
        return this.y;
    }

    constructor(private id: Guid, private x: number, private y: number) {}
}