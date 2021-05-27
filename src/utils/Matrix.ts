export class Matrix implements IMatrix {
    public getStraightLinesFromPoint(x: number, y: number, xEnumerations?: number, yEnumerations?: number): Array<Array<number>> {
        let coordinates = Array<Array<number>>();

        //positive depth
        for (let i = 1; i <= this.positiveYEnumerations(yEnumerations); i++) {
            coordinates[x] = [y + i];
        }

        //negative depth
        for (let i = 1; i <= this.negativeYEnumerations(yEnumerations); i++) {
            coordinates[x] = [y - i];
        }

        //positive width
        for (let i = 1; i <= this.positiveXEnumerations(xEnumerations); i++) {
            coordinates[x + i] = [y]
        }

        //negative width
        for (let i = 1; i <= this.negativeXEnumerations(xEnumerations); i++) {
            coordinates[x - i] = [y];
        }

        return coordinates;
    }

    public getDiagonalLinesFromPoint(x: number, y: number, xEnumerations?: number, yEnumerations?: number): Array<Array<number>> {
        let coordinates = Array<Array<number>>();

        



        return coordinates;
    }

    private positiveXEnumerations = (xEnumerations: number | undefined): number => !xEnumerations ? this.width : xEnumerations;
    private positiveYEnumerations = (yEnumerations: number | undefined): number => !yEnumerations ? this.depth : yEnumerations;
    private negativeXEnumerations = (xEnumerations: number | undefined): number => !xEnumerations ? 0 : xEnumerations;
    private negativeYEnumerations = (yEnumerations: number | undefined): number => !yEnumerations ? 0 : yEnumerations;

    constructor(private width: number, private depth: number) { }
}

export interface IMatrix {
    getStraightLinesFromPoint(x: number, y: number): Array<Array<number>>;
    getStraightLinesFromPoint(x: number, y: number, xEnumerations: number, yEnumerations: number): Array<Array<number>>;
    getDiagonalLinesFromPoint(x: number, y: number): Array<Array<number>>;
    getDiagonalLinesFromPoint(x: number, y: number, xEnumerations: number, yEnumerations: number): Array<Array<number>>;
}