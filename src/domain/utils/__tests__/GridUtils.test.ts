import ChessGameConfig from "../../ChessGameConfig";
import Position from "../../Position";
import GridUtils from "../GridUtils";

describe('horizontal tests', () => {
    it('moves the postition on the x-axis one step right', () => {
        const position = GridUtils.horizontal(new Position(1, 1), 1);

        expect(position.X).toEqual(2);
    });

    it('moves the position on the x-axis one step left', () => {
        const position = GridUtils.horizontal(new Position(1, 1), -1);

        expect(position.X).toEqual(0);
    });
});

describe('horizontal until collision tests', () => {
    it('should return one item before colliding', () => {
        const positions = GridUtils.horizontalUntilCollision(new Position(1, 1), [new Position(3, 1)], 1, 3, 1);
        //should return x: 2, y: 1
        expect(positions).toHaveLength(1);
    });

    it('should return one item since the limit is set to 1', () => {
        const positions = GridUtils.horizontalUntilCollision(new Position(1, 1), [new Position(4, 1)], 1, 2, 1);

        //should return x: 2, y: 1
        expect(positions).toHaveLength(1);
    });

    it('should return eight items before colliding', () => {
        const positions = GridUtils.horizontalUntilCollision(new Position(1, 1), [new Position(10, 1)], 1, 10, 1);

        //should return x: 2, 3, 4, 5, 6, 7, 8, 9
        expect(positions).toHaveLength(8);
    });
});

describe('all horizontal until collision tests', () => {

    it('should return two items before colliding. One step left and one step right', () => {
        const positions = GridUtils.allHorizontalUntilCollision(new Position(1, 1), [new Position(3, 1)], 0, new ChessGameConfig().Width, false);

        //should return x: 0 and x: 2
        expect(positions).toHaveLength(2);
    });
});
