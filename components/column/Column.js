import { useDrop } from "react-dnd";
import { ItemTypes } from "../item/Item";

export default function Column({ children, name }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));
  return (
    <div
      style={{
        minWidth: 250,
        height: "100%",
        backgroundColor: "gray",
        margin: "0 10px",
        padding: "0 10px"
      }}
      ref={drop}
      role="Column"
    >
      {children}
    </div>
  );
}
