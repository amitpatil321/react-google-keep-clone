import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Alert } from "antd";
import { getDocs, collection, getFirestore, addDoc } from "firebase/firestore";

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
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [bgColor, setBgColor] = React.useState("#fff");
  const [showAddNoteForm, toggleAddNoteForm] = React.useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const notesCollection = await collection(db, "notes");
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { ...data, id };
      });
      setLoading(false);
      setNotes(notesList);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Error fetching notes", +err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onBlurOut = async () => {
    if (!descFocused && !titleFocused) {
      // If add notes is open, then close it
      if (showAddNoteForm) {
        setBgColor("#fff");
        toggleAddNoteForm(false);
      }
      if (title?.length || description?.length) {
        let noteObj = {
          title,
          description,
          color: bgColor,
        };
        try {
          let { id } = await addDoc(collection(getFirestore(), "notes"), {
            ...noteObj,
          });
          setBgColor("#fff");
          setTitle("");
          setDescription("");
          setNotes([{ id, ...noteObj }, ...notes]);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("somethig is focused");
    }
  };

  return (
    <div className={styles.app} onClick={onBlurOut}>
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
                <AddNoteForm
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                  showAddNoteForm={showAddNoteForm}
                  toggleAddNoteForm={toggleAddNoteForm}
                  title={title}
                  description={description}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setTitleFocused={setTitleFocused}
                  setDescFocused={setDescFocused}
                />
                {error && (
                  <p>
                    <br />
                    <Alert type="error" message={error} showIcon />
                  </p>
                )}
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
