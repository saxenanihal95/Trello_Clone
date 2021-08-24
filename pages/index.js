import { v4 as uuidv4 } from "uuid";
import Column from "../components/column/Column";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Item from "../components/item/Item";

export default function IndexPage() {
  const columns = [
    {
      id: uuidv4(),
      title: "In Progress",
      items: [
        {
          title: "new item",
          id: uuidv4()
        }
      ]
    },
    {
      id: uuidv4(),
      title: "TODO",
      items: [
        {
          title: "new item 2",
          id: uuidv4()
        }
      ]
    }
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", height: "100vh", overflowX: "scroll" }}>
        {columns.map((column) => (
          <Column key={column.id}>
            {column.title}
            {column?.items?.map((item) => (
              <Item key={item.id} name={item.id}>
                {item.title}
              </Item>
            ))}
          </Column>
        ))}
      </div>
    </DndProvider>
  );
}
