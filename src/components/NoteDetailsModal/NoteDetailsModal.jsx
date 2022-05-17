import React from "react";
import { Modal } from "antd";

const NoteDetailsModal = ({ selectedNote, setSelectedNote }) => {
  return (
    <Modal
      visible={selectedNote}
      onOk={() => setSelectedNote(null)}
      onCancel={() => setSelectedNote(null)}
    >
      <h3>{selectedNote.title}</h3>
      <p>{selectedNote.description}</p>
    </Modal>
  );
};

export default NoteDetailsModal;
