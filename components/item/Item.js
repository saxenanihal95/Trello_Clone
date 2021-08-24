import { useDrag } from "react-dnd";
export const ItemTypes = { CARD: "card" };

const style = {
  backgroundColor: "blue",
  width: "100%",
  minHeight: 100,
  margin: "10px 0"
};

export default function Item({ children, name, end, title }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { name },
    end,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} role="Card" style={{ ...style, opacity }}>
      {children}
    </div>
  );
}
