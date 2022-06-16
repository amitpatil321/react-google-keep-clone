import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Row, Col, Card, notification, Empty } from "antd";
import { doc, updateDoc } from "firebase/firestore";

import { Responsive, WidthProvider } from "react-grid-layout";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { trim } from "@/utils.js";
import db from "@/config/firebase";
import Controls from "@/components/Controls/Controls";
import NoteDetailsModal from "@/components/NoteDetailsModal/NoteDetailsModal";

import styles from "./ListNotes.module.css";
const ResponsiveGridLayout = WidthProvider(Responsive);

const ListNotes = ({ loading, notes }) => {
  const [notesList, setNotes] = useState([notes]);
  const [layout, setLayout] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Generate layout for grids
  useEffect(() => {
    const layout = [];
    let noteWidth = 2.5;
    let noteHeight = 6;
    notes.map((eachNote, index) => {
      layout.push({
        i: eachNote.id,
        x: index * noteWidth,
        y: 0,
        w: noteWidth,
        h:
          eachNote?.description?.length < 200
            ? noteHeight
            : eachNote?.description?.length * 0.04, // Dynamic height
      });
    });
    setLayout(layout);
  }, [notes]);

  const setColor = async (noteId, color) => {
    const noteRef = doc(db, "notes", noteId);

    // Create copy of existing color
    const oldColor = notes.find((e) => e.id === noteId).color;
    notes.find((e) => e.id === noteId).color = color;
    setNotes([...notes]);

    // Now, Update firebase with new changes
    try {
      await updateDoc(noteRef, {
        color: color,
      });
    } catch (error) {
      // On failure revert back the changes
      notes.find((e) => e.id === noteId).color = oldColor;
      setNotes([...notes]);
      notification["error"]({
        message: "Error",
        description: "Error updating note color",
      });
    }
  };

  return (
    <Row>
      <Col span={24} className={styles.notes}>
        {loading && <div>Loading...</div>}
        <ResponsiveGridLayout
          className={styles.layout}
          layout={layout}
          //   cols={12}
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          width={800}
          measureBeforeMount={false}
          compactType="horizontal"
          isResizable={false}
          resizeHandles={[]}
        >
          {notes.map((eachNote, index) => {
            return (
              <Card
                // onClick={() => setSelectedNote(eachNote)}
                hoverable
                key={eachNote.id}
                className={styles.note}
                style={{ backgroundColor: eachNote.color }}
              >
                <Row>
                  {eachNote.title && (
                    <Col span={23} className={styles.noteTitle}>
                      {trim(eachNote.title, 20)}
                    </Col>
                  )}
                  <Col span={24} className={styles.noteDesc}>
                    <div className={styles.notedescription}>
                      {trim(eachNote.description, 500)}
                    </div>
                    <div className={styles.controls}>
                      <Controls />
                    </div>
                  </Col>
                  <span className={styles.pinIcon}>
                    <PushPinOutlinedIcon />
                  </span>
                  <span className={styles.checkIcon}>
                    <CheckCircleIcon />
                  </span>
                </Row>
              </Card>
            );
          })}
        </ResponsiveGridLayout>
        {!loading && notes.length <= 0 && <Empty />}
        {selectedNote && (
          <NoteDetailsModal
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
          />
        )}
      </Col>
    </Row>
  );
};

export default ListNotes;
