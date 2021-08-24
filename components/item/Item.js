import { useDrag } from "react-dnd";
export const ItemTypes = { CARD: "card" };

const style = {
  backgroundColor: "#F4F5F7",
  width: "100%",
  padding: 10,
  margin: "10px 0",
  boxSizing: "border-box"
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
