import Position from "../chess-domain/Position";

declare global {
    interface Array<T> {
        addTo(count: number, x: number, y: number, xEnumerator: number, yEnumerator: number): void;
    }
}

Array.prototype.addTo = function <T>(this: T[], count: number, x: number, y: number, xEnumerator: number, yEnumerator: number): void {

    for (let i = 1; i <= count; i++) {
        this.push(new Position(x, y + i));
    }
}