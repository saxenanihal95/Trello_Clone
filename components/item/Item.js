import { useDrag } from "react-dnd";
export const ItemTypes = { CARD: "card" };

const style = {
  backgroundColor: "blue",
  width: "100%",
  minHeight: 100
};

export default function Item({ children, name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
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
