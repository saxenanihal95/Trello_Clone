import { v4 as uuidv4 } from "uuid";
import Column from "../components/column/Column";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Item from "../components/item/Item";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import ItemModal from "../components/modal/ItemModal";

Modal.setAppElement("#__next");
let subtitle;

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
  const [html, setHtml] = useState("");

  const initialSelectedItem = {
    itemIndex: "",
    columnIndex: "",
    item: { title: "" }
  };

  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

  const setModalItem = ({ columnIndex, itemIndex }) => {
    const item = columns[columnIndex]?.items[itemIndex];
    setHtml(item.title);
    setSelectedItem({ columnIndex, itemIndex, item });
  };

  useEffect(() => {
    if (html && Boolean(String(selectedItem.columnIndex))) {
      let updatedColumn = [...columns];
      updatedColumn[selectedItem.columnIndex].items[
        selectedItem.itemIndex
      ].title = html;
      console.log(html);
      setColumns(updatedColumn);
    }
  }, [html]);

  const closeModal = () => {
    setSelectedItem(initialSelectedItem);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ItemModal
        item={columns[selectedItem.columnIndex]?.items[selectedItem.itemIndex]}
        column={columns[selectedItem.columnIndex]}
        html={html}
        setHtml={setHtml}
        isOpen={Boolean(String(selectedItem?.itemIndex))}
        closeModal={closeModal}
      />
      <div style={{ display: "flex", height: "100vh", overflowX: "scroll" }}>
        {columns.map((column, columnIndex) => (
          <Column key={column.id} name={column.id}>
            {column.title}
            {column?.items?.map((item, itemIndex) => (
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
                      const removeIndex = columns[columnIndex].items.findIndex(
                        (i) => i.id === newItem.name
                      );

                      updatedColumn[columnIndex].items.splice(removeIndex, 1);
                      updatedColumn[newColumnIndex].items.push(item);
                    }
                    setColumns(updatedColumn);
                  }
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setModalItem({ columnIndex, itemIndex })}
                >
                  {item.title}
                </div>
              </Item>
            ))}
          </Column>
        ))}
      </div>
    </DndProvider>
  );
}
