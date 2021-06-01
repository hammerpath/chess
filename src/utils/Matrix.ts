import { useDebugValue } from "react";
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

            if (!item) {
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

    public getPositionsUntilConflicts(currentPosition: Position, positions: Array<Position>, conflicts: Array<Position>): Array<Position> {
        return this.deepSplicePositions(currentPosition, positions, conflicts, false);
    }

    public getPositionsIncludingConflicts(currentPosition: Position, positions: Array<Position>, conflicts: Array<Position>): Array<Position> {
        return this.deepSplicePositions(currentPosition, positions, conflicts, true);
    }

    private deepSplicePositions(currentPosition: Position, positions: Array<Position>, splicePositions: Array<Position>, includeSplicedPosition: boolean) {
        let positionsCopy = [...positions];

        const matches = this.getMatches(positions, splicePositions);

        matches.forEach(match => {
            const direction = this.getDirection(currentPosition.X, currentPosition.Y, match.X, match.Y);

            //removes the matched position
            if (!includeSplicedPosition) {
                const index = positionsCopy.findIndex(p => p.X === match.X && p.Y === match.Y);

                if (index > -1) {
                    positionsCopy.splice(index, 1);
                }
            }

            const positionsToRemove = this.getPositions(match.X, match.Y, direction);

            positionsToRemove.forEach(pos => {
                const index = positionsCopy.findIndex(p => p.X === pos.X && p.Y === pos.Y);

                if (index > -1) {
                    positionsCopy.splice(index, 1);
                }
            });
        });

        return positionsCopy;
    }

    private getMatches(positions: Array<Position>, matchingPositions: Array<Position>): Array<Position> {
        return positions.filter(position =>
            matchingPositions.some(conflict =>
                conflict.X === position.X
                && conflict.Y === position.Y));
    }

    private getDirection(startX: number, startY: number, x: number, y: number): Direction {
        const xValue = x - startX;
        const yValue = y - startY;

        if (xValue === 0 && yValue === 0) {
            throw new Error('Conflicts with start position');
        }

        //#region straight lines

        if (xValue > 0 && yValue === 0) {
            return Direction.Right;
        }

        if (xValue < 0 && yValue === 0) {
            return Direction.Left;
        }

        if (xValue === 0 && yValue > 0) {
            return Direction.Up;
        }

        if (xValue === 0 && yValue < 0) {
            return Direction.Down;
        }

        //#endregion

        //#region diagonal lines

        if (xValue > 0 && yValue > 0 && Math.abs(xValue) === Math.abs(yValue)) {
            return Direction.UpRight;
        }

        if (xValue > 0 && yValue < 0 && Math.abs(xValue) === Math.abs(yValue)) {
            return Direction.DownRight;
        }

        if (xValue < 0 && yValue < 0 && Math.abs(xValue) === Math.abs(yValue)) {
            return Direction.DownLeft;
        }

        if (xValue < 0 && yValue > 0 && Math.abs(xValue) === Math.abs(yValue)) {
            return Direction.UpLeft;
        }

        //#endregion

        throw new Error('Only supports straight and diagonal moves');
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

    getPositionsUntilConflicts(currentPosition: Position, positions: Array<Position>, conflicts: Array<Position>): Array<Position>;
    getPositionsIncludingConflicts(currentPosition: Position, positions: Array<Position>, conflicts: Array<Position>): Array<Position>;
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