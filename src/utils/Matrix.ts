import Position from "../chess-domain/Position";

export class Matrix implements IMatrix {

    public getStraightLinesFromPoint(x: number, y: number, count?: number): Array<Position> {
        let coordinates = Array<Position>();

        coordinates = coordinates.concat(this.getPositions(x, y, Direction.Up, count));
        coordinates = coordinates.concat(this.getPositions(x, y, Direction.Down, count));
        coordinates = coordinates.concat(this.getPositions(x, y, Direction.Right, count));
        coordinates = coordinates.concat(this.getPositions(x, y, Direction.Left, count));

        return coordinates;
    }

    public getDiagonalLinesFromPoint(x: number, y: number, count?: number): Array<Position> {
        let coordinates = Array<Position>();

        coordinates = coordinates.concat(this.getPositions(x, y, Direction.UpRight, count));
        coordinates = coordinates.concat(this.getPositions(x, y, Direction.DownRight, count));
        coordinates = coordinates.concat(this.getPositions(x, y, Direction.DownLeft, count));
        coordinates = coordinates.concat(this.getPositions(x, y, Direction.UpLeft, count));

        return coordinates;
    }

    public getPositionsBasedOnDirection(x: number, y: number, directions: Array<Direction>): Array<Position> {
        let coordinates = new Array<Position>();

        let currentX = x;
        let currentY = y;

        directions.every(direction => {
            const [item] = this.getPositions(currentX, currentY, direction, 1).slice(-1);

            if(!item){
                coordinates = new Array<Position>();
                return false;
            }

            coordinates.push(item);

            currentX = item.X;
            currentY = item.Y;

            return true;
        });

        return coordinates;
    }


    public getPositions(x: number, y: number, direction: Direction, count?: number): Array<Position> {
        let coordinates = Array<Position>();

        switch (direction) {
            case Direction.Up:
                for (let i = 1; i <= this.positiveDepthEnumerations(count, y); i++) {
                    coordinates.push(new Position(x, y + i));
                }

                return coordinates;

            case Direction.UpRight:
                for (let i = 1; i <= this.positiveDepthEnumerations(count, y) && i <= this.positiveWidthEnumerations(count, x); i++) {
                    coordinates.push(new Position(x + i, y + i));
                }

                return coordinates;

            case Direction.Right:
                for (let i = 1; i <= this.positiveWidthEnumerations(count, x); i++) {
                    coordinates.push(new Position(x + i, y));
                }

                return coordinates;

            case Direction.DownRight:
                for (let i = 1; i <= this.negativeDepthEnumerations(count, y) && i <= this.positiveWidthEnumerations(count, x); i++) {
                    coordinates.push(new Position(x + i, y - i));
                }

                return coordinates;

            case Direction.Down:
                for (let i = 1; i <= this.negativeDepthEnumerations(count, y); i++) {
                    coordinates.push(new Position(x, y - i));
                }

                return coordinates;

            case Direction.DownLeft:
                for (let i = 1; i <= this.negativeDepthEnumerations(count, y) && i <= this.negativeWidthEnumerations(count, x); i++) {
                    coordinates.push(new Position(x - i, y - i));
                }

                return coordinates;

            case Direction.Left:
                for (let i = 1; i <= this.negativeWidthEnumerations(count, x); i++) {
                    coordinates.push(new Position(x - i, y));
                }

                return coordinates;

            case Direction.UpLeft:
                for (let i = 1; i <= this.positiveDepthEnumerations(count, y) && i <= this.negativeWidthEnumerations(count, x); i++) {
                    coordinates.push(new Position(x - i, y + i));
                }

                return coordinates;

            default:
                throw new Error('Not implemented');
        }

    }

    private positiveWidthEnumerations = (xEnumerations: number | undefined, x: number): number => !xEnumerations ? this.width - x : this.width + 1 - x - xEnumerations > 0 ? xEnumerations : 0;
    private positiveDepthEnumerations = (yEnumerations: number | undefined, y: number): number => !yEnumerations ? this.depth - y : this.depth + 1 - y - yEnumerations > 0 ? yEnumerations : 0;
    private negativeWidthEnumerations = (xEnumerations: number | undefined, x: number): number => !xEnumerations ? x : x + 1 - xEnumerations > 0 ? xEnumerations : 0;
    private negativeDepthEnumerations = (yEnumerations: number | undefined, y: number): number => !yEnumerations ? y : y + 1 - yEnumerations > 0 ? yEnumerations : 0;

    constructor(private width: number, private depth: number) { }
}

export interface IMatrix {
    getStraightLinesFromPoint(x: number, y: number): Array<Position>;
    getStraightLinesFromPoint(x: number, y: number, count: number): Array<Position>;
    getPositionsBasedOnDirection(x: number, y: number, directions: Array<Direction>): Array<Position>;
    getDiagonalLinesFromPoint(x: number, y: number): Array<Position>;
    getDiagonalLinesFromPoint(x: number, y: number, count: number): Array<Position>;
    getPositions(x: number, y: number, direction: Direction, count?: number): Array<Position>;
    getPositions(x: number, y: number, direction: Direction): Array<Position>;
}

export enum Direction {
    Up,
    UpRight,
    Right,
    DownRight,
    Down,
    DownLeft,
    Left,
    UpLeft
}