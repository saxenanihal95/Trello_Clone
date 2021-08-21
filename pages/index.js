import { v4 as uuidv4 } from "uuid";

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
    <div style={{ display: "flex", height: "100vh", overflowX: "scroll" }}>
      {columns.map((column) => (
        <div
          key={column.id}
          style={{
            minWidth: 250,
            backgroundColor: "gray",
            height: "100%",
            margin: "0 10px",
            padding: "0 10px"
          }}
        >
          {column.title}
          {column?.items?.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: "blue", width: "100%", minHeight: 100 }}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
