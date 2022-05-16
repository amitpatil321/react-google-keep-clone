import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Row, Col, Card, Space } from "antd";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  BellOutlined,
  UserAddOutlined,
  FormatPainterOutlined,
  PictureOutlined,
  FileOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import { trim } from "@/utils.js";
import db from "@/config/firebase";

import styles from "./ListNotes.module.css";
const ResponsiveGridLayout = WidthProvider(Responsive);

const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);

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
    let noteHeight = 1;
    notes.map((eachNote, index) => {
      layout.push({
        i: eachNote.id,
        x: index * noteWidth,
        y: 0,
        w: noteWidth,
        h: noteHeight,
      });
    });
    console.log(layout);
    setLayout(layout);
  }, [notes]);

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
          cols={{ lg: 12, md: 12, sm: 10, xs: 4, xxs: 2 }}
          rowHeight={200}
          width={800}
          measureBeforeMount={false}
          compactType={null}
          isResizable={false}
          resizeHandles={[]}
        >
          {notes.map((eachNote, index) => {
            return (
              <Card hoverable key={eachNote.id} className={styles.note}>
                <h4>{trim(eachNote.title, 20)}</h4>
                <b>{trim(eachNote.description, 50)}</b>
                <div className={styles.controls}>
                  <Space>
                    <BellOutlined />
                    <UserAddOutlined />
                    <FormatPainterOutlined />
                    <PictureOutlined />
                    <FileOutlined />
                    <MoreOutlined />
                  </Space>
                </div>
              </Card>
            );
          })}
        </ResponsiveGridLayout>
      </Col>
    </Row>
  );
};

export default ListNotes;
