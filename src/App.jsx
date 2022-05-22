import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Menu } from "antd";
import { getDocs, collection } from "firebase/firestore";

import db from "@/config/firebase";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import ListNotes from "./components/ListNotes/ListNotes";

import styles from "./App.module.css";
import "antd/dist/antd.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
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

  const onAddNote = (note) => {
    setNotes([note, ...notes]);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className={styles.app}>
      <Row>
        <Col span={24}>
          <Header
            loading={loading}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </Col>
        <Col span={24}>
          <Layout className="layout">
            <Sidebar collapsed={collapsed} />
            <Layout className={styles.whitebg}>
              <Content
                className={[styles.whitebg, styles.nopaddingmargin].join(" ")}
              >
                <AddNoteForm onAddNote={onAddNote} />
                <ListNotes loading={loading} notes={notes} />
              </Content>
            </Layout>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default App;
