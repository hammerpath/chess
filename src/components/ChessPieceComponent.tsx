import ChessPieceUtils from "../application/ChessPieceUtils";
import { ChessPieceType } from "../domain/enums/ChessPieceType";
import { Color } from "../domain/enums/Color";

interface IChessPieceComponent {
    color: Color;
    chessPieceType: ChessPieceType;
}

function ChessPieceComponent(props: IChessPieceComponent) {

    return (
         <img className={"chess-piece-icon"} src={ChessPieceUtils.getIcon(props.chessPieceType, props.color)}></img> 
    );
}

export default ChessPieceComponent;