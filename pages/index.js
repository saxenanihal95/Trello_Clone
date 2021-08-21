import { v4 as uuidv4 } from "uuid";

export default function IndexPage() {
  const columns = [
    { id: uuidv4(), title: "In Progress" },
    { id: uuidv4(), title: "TODO" }
  ];
  const items = [];
  return (
    <div style={{ display: "flex", height: "100vh", overflowX: "scroll" }}>
      {columns.map((column) => (
        <div
          key={column.id}
          style={{
            minWidth: 250,
            backgroundColor: "gray",
            height: "100%",
            margin: "0 10px"
          }}
        >
          {column.title}
        </div>
      ))}
    </div>
  );
}
