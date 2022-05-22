import React from "react";

import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";

import {
  Row,
  Col,
  Input,
  Space,
  Tooltip,
  Popover,
  Button,
  notification,
} from "antd";
import { collection } from "firebase/firestore";
import { getFirestore, addDoc } from "firebase/firestore";

import Controls from "@/components/Controls/Controls";
import styles from "./AddNoteForm.module.css";

const { TextArea } = Input;

const AddNoteForm = ({ onAddNote }) => {
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [showForm, toggleForm] = React.useState(false);

  const saveNote = async () => {
    try {
      if (title.length) {
        let { id } = await addDoc(collection(getFirestore(), "notes"), {
          title,
          description: "test",
        });
        onAddNote({ id, title, description });
        setTitle(null);
        setDescription(null);
      }
    } catch (error) {
      notification["error"]({
        message: "Error",
        description: "Error adding note",
      });
    }
  };

  return (
    <Row tabIndex={0}>
      <Col span={4} />
      <Col span={16}>
        <div
          className={styles.addnoteinput}
          onClick={() => toggleForm(!showForm)}
          style={{ display: showForm ? "none" : "block" }}
        >
          Take a note...
          <div className={styles.icons}>
            <Space>
              <Tooltip placement="bottom" title="new list">
                <CheckBoxOutlinedIcon fontSize="small" />
              </Tooltip>
              <Tooltip placement="bottom" title="new note with drawing">
                <BrushOutlinedIcon fontSize="small" />
              </Tooltip>
              <Tooltip placement="bottom" title="new note with image">
                <ImageOutlinedIcon fontSize="small" />
              </Tooltip>
            </Space>
          </div>
        </div>
        {showForm && (
          <Row className={styles.noteInputForm}>
            <Col span={24}>
              <Input
                value={title}
                className={styles.title}
                bordered={false}
                placeholder="Title"
                onChange={(event) => setTitle(event.target.value)}
                onBlur={() => saveNote()}
              />
              <TextArea
                value={description}
                className={styles.description}
                bordered={false}
                placeholder="Take a note..."
                autoSize
              />
            </Col>
            <Col span={24}>
              <Row>
                <Col span={20}>
                  <Controls />
                </Col>
                <Col span={4}>
                  <Button
                    type="link"
                    className={styles.close}
                    onClick={() => toggleForm(!showForm)}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
      <Col span={4} />
    </Row>
  );
};

export default AddNoteForm;
