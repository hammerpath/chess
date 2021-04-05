export default abstract class Square {
    public static getSquares = (width: number, depth: number): Array<Array<number>> => {
        let rows = Array<Array<number>>();

        for (let y = 0; y <= depth; y++) {
            let squares = Array<number>();
            for (let x = 0; x <= width; x++) {
                squares.push(x);
            }
            rows.push(squares);
        }

        return rows;
    }
}