import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Row, Col, Card, Space, Popover, notification } from "antd";
import { collection } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { ref as sRef } from "firebase/storage";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Responsive, WidthProvider } from "react-grid-layout";
import { GithubPicker } from "react-color";
import {
  BellOutlined,
  UserAddOutlined,
  FormatPainterOutlined,
  PictureOutlined,
  FileOutlined,
  MoreOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

import { trim } from "@/utils.js";
import db from "@/config/firebase";
import NoteDetailsModal from "@/components/NoteDetailsModal/NoteDetailsModal";

import styles from "./ListNotes.module.css";
const ResponsiveGridLayout = WidthProvider(Responsive);

const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const notesCollection = await collection(db, "notes");
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { ...data, id };
      });
      setLoading(false);
      setNotes(notesList);
    };
    fetch();
  }, []);

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
            : eachNote.description.length * 0.04, // Dynamic height
      });
    });
    setLayout(layout);
  }, [notes]);

  const setColor = async (noteId, color) => {
    // try {
    //   await addDoc(collection(getFirestore(), "notes"), {
    //     name: "aaa",
    //     text: "aasdsadasd",
    //   });
    // } catch (error) {
    //   console.error("Error writing new message to Firebase Database", error);
    // }
    const washingtonRef = doc(db, "notes", noteId);

    // Create copy of existing color
    const oldColor = notes.find((e) => e.id === noteId).color;
    notes.find((e) => e.id === noteId).color = color;
    setNotes([...notes]);

    // Now, Update firebase with new changes
    try {
      await updateDoc(washingtonRef, {
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
                  <Col span={23}>
                    <h4>{trim(eachNote.title, 20)}</h4>
                  </Col>
                  <Col span={1}>
                    <PushpinOutlined onClick={() => alert("Pin clicked")} />
                  </Col>
                  <Col span={24}>
                    <div className={styles.notedescription}>
                      {trim(eachNote.description, 500)}
                    </div>
                    <div
                      className={styles.controls}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    >
                      <Space>
                        <BellOutlined />
                        <UserAddOutlined />
                        <Popover
                          style={{ padding: "0px !important" }}
                          content={
                            <GithubPicker
                              onChange={(color) =>
                                setColor(eachNote.id, color.hex)
                              }
                            />
                          }
                          trigger="click"
                          placement="bottom"
                          triangle="hide"
                        >
                          <FormatPainterOutlined />
                        </Popover>
                        <PictureOutlined />
                        <FileOutlined />
                        <MoreOutlined />
                      </Space>
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </ResponsiveGridLayout>
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
