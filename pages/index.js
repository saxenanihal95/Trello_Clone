import { v4 as uuidv4 } from "uuid";
import Column from "../components/column/Column";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Item from "../components/item/Item";
import { useState } from "react";

export default function IndexPage() {
  const initalColumns = [
    {
      id: uuidv4(),
      title: "In Progress",
      items: [
        {
          title: "new item",
          id: uuidv4()
        },
        {
          title: "new item 2",
          id: uuidv4()
        }
      ]
    },
    {
      id: uuidv4(),
      title: "TODO",
      items: [
        {
          title: "new item 3",
          id: uuidv4()
        }
      ]
    }
  ];

  const [columns, setColumns] = useState(initalColumns);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", height: "100vh", overflowX: "scroll" }}>
        {columns.map((column, index) => (
          <Column key={column.id} name={column.id}>
            {column.title}
            {column?.items?.map((item) => (
              <Item
                key={item.id}
                name={item.id}
                end={(newItem, monitor) => {
                  const dropResult = monitor.getDropResult();

                  if (newItem && dropResult) {
                    let updatedColumn = [...columns];
                    if (dropResult.name === column.id) {
                    } else {
                      const newColumnIndex = columns.findIndex(
                        (item) => item.id === dropResult.name
                      );
                      const removeIndex = columns[index].items.findIndex(
                        (i) => i.id === newItem.name
                      );

                      updatedColumn[index].items.splice(removeIndex, 1);
                      updatedColumn[newColumnIndex].items.push(item);
                    }

                    setColumns(updatedColumn);
                  }
                }}
              >
                {item.title}
              </Item>
            ))}
          </Column>
        ))}
      </div>
    </DndProvider>
  );
}
