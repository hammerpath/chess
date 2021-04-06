import Position from "../Position"

export default abstract class GridUtils {

    public static horizontal = (position: Position, accummulator: number) => {
        return new Position(position.X + accummulator, position.Y);
    }

    public static vertical = (position: Position, accummulator: number) => {
        return new Position(position.X, position.Y + accummulator);
    }

    public static digonal = (position: Position, accummulator: number) => {
        return new Position(position.X + accummulator, position.Y + accummulator);
    }

    public static colliding = (position: Position, positions: Position[]): boolean => {
        return positions.find(p => p.X === position.X && p.Y === position.Y) !== undefined;
    }

    public static horizontalUntilCollision = (position: Position, positions: Position[], min: number, max: number, accummulator: number, includeColliding: boolean = false): Position[] => {
        let positionsUntilCollision = new Array<Position>();
        let acc = accummulator;
        let hasCollided = false;

        let newPosition = GridUtils.horizontal(position, acc);
        let colliding = GridUtils.colliding(newPosition, positions)


        while ((!colliding
            || (includeColliding && !hasCollided))
            && (position.X + acc >= min) && (position.X + acc <= max)) {

            positionsUntilCollision.push(newPosition);

            acc = acc += accummulator;

            if (colliding) {
                hasCollided = true;
            }

            newPosition = GridUtils.horizontal(position, acc);
            colliding = GridUtils.colliding(newPosition, positions);

        }

        return positionsUntilCollision;
    }

    public static verticalUntilCollision = (position: Position, positions: Position[], min: number, max: number, accummulator: number, includeColliding: boolean = false): Position[] => {
        let positionsUntilCollision = new Array<Position>();
        let acc = accummulator;
        let hasCollided = false;

        let newPosition = GridUtils.vertical(position, acc);
        let colliding = GridUtils.colliding(newPosition, positions);

        while ((!colliding
            || (includeColliding && !hasCollided))
            && (newPosition.Y >= min) && (newPosition.Y <= max)) {

            positionsUntilCollision.push(newPosition);

            acc = acc += accummulator;

            if (colliding) {
                hasCollided = true;
            }

            newPosition = GridUtils.vertical(position, acc);
            colliding = GridUtils.colliding(newPosition, positions);
        }

        return positionsUntilCollision;
    }

    public static diagonalUntilCollision = (position: Position, positions: Position[], min: number, max: number, accummulator: number, includeColliding: boolean = false): Position[] => {
        let positionsUntilCollision = new Array<Position>();
        let acc = accummulator;
        let hasCollided = false;

        let newPosition = GridUtils.digonal(position, acc);
        let colliding = GridUtils.colliding(newPosition, positions);

        while ((!colliding
            || (includeColliding && !hasCollided))
            && (newPosition.Y >= min) && (newPosition.Y <= max)
            && (newPosition.X >= min) && (newPosition.X <= max)) {

            positionsUntilCollision.push(newPosition);

            acc = acc += accummulator;

            if (colliding) {
                hasCollided = true;
            }

            newPosition = GridUtils.digonal(position, acc);
            colliding = GridUtils.colliding(newPosition, positions);
        }

        return positionsUntilCollision;
    }

    public static allHorizontalUntilCollision = (position: Position, positions: Position[], min: number, max: number, includeColliding: boolean): Position[] => {
        let positionsUntilCollision = new Array<Position>();

        positionsUntilCollision = positionsUntilCollision.concat(GridUtils.horizontalUntilCollision(position, positions, min, max, 1, includeColliding));
        positionsUntilCollision = positionsUntilCollision.concat(GridUtils.horizontalUntilCollision(position, positions, min, max, -1, includeColliding));

        return positionsUntilCollision;
    }

    public static allVerticalUntilCollision = (position: Position, positions: Position[], min: number, max: number, includeColliding: boolean): Position[] => {
        let positionsUntilCollision = new Array<Position>();

        positionsUntilCollision = positionsUntilCollision.concat(GridUtils.verticalUntilCollision(position, positions, min, max, 1, includeColliding));
        positionsUntilCollision = positionsUntilCollision.concat(GridUtils.verticalUntilCollision(position, positions, min, max, -1, includeColliding));

        return positionsUntilCollision;
    }

    public static allDiagonalUntilCollision = (position: Position, positions: Position[], min: number, max: number, includeColliding: boolean): Position[] => {
        let positionsUntilCollision = new Array<Position>();

        positionsUntilCollision = positionsUntilCollision.concat(GridUtils.diagonalUntilCollision(position, positions, min, max, 1, includeColliding));
        positionsUntilCollision = positionsUntilCollision.concat(GridUtils.diagonalUntilCollision(position, positions, min, max, -1, includeColliding));

        return positionsUntilCollision;
    }
}