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
  PushpinOutlined,
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
    let noteWidth = 2;
    let noteHeight = 6;
    notes.map((eachNote, index) => {
      layout.push({
        i: eachNote.id,
        x: index * noteWidth,
        y: 0,
        w: noteWidth,
        h:
          eachNote.description.length < 200
            ? noteHeight
            : eachNote.description.length * 0.03, // Dynamic height
      });
    });
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
              <Card hoverable key={eachNote.id} className={styles.note}>
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
                  </Col>
                </Row>
              </Card>
            );
          })}
        </ResponsiveGridLayout>
      </Col>
    </Row>
  );
};

export default ListNotes;
