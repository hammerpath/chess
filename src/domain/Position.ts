export default class Position {

    get X(): number {
        return this.x;
    }

    get Y(): number {
        return this.y;
    }

    constructor(private x: number, private y: number) {}
}