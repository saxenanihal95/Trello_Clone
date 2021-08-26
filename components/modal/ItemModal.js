import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import Modal from "react-modal";

export default function ItemModal({
  column,
  item,
  closeModal,
  isOpen,
  html,
  setHtml
}) {
  const handleChange = (evt) => {
    setHtml(evt.target.value);
  };

  const contentEditable = useRef(null);
  if (!item || !column) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
        content: { padding: "10px 20px" }
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <ContentEditable
            innerRef={contentEditable}
            html={html}
            disabled={false}
            onChange={handleChange}
            tagName="h2"
            style={{ margin: 0 }}
          />
        </div>
        <div>
          <button onClick={closeModal}>close</button>
        </div>
      </div>
      in list {column.title}
    </Modal>
  );
}
