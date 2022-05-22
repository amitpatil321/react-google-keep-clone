import React from "react";
import {
  OrderedListOutlined,
  FileImageOutlined,
  BellOutlined,
  UserAddOutlined,
  FormatPainterOutlined,
  PictureOutlined,
  FileOutlined,
  MoreOutlined,
} from "@ant-design/icons";
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
import { GithubPicker } from "react-color";
import { collection } from "firebase/firestore";

import { getFirestore, addDoc } from "firebase/firestore";

import styles from "./AddNoteForm.module.css";

const { TextArea } = Input;

const AddNoteForm = ({ onAddNote }) => {
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [showForm, toggleForm] = React.useState(false);

  const saveNote = async () => {
    try {
      let { id } = await addDoc(collection(getFirestore(), "notes"), {
        title,
        description: "test",
      });
      onAddNote({ id, title, description });
      setTitle(null);
      setDescription(null);
    } catch (error) {
      notification["error"]({
        message: "Error",
        description: "Error updating note color",
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
            <Tooltip title="new list">
              <OrderedListOutlined />
            </Tooltip>
            <Tooltip title="new note with drawing">
              <FormatPainterOutlined />
            </Tooltip>
            <Tooltip title="new note with image">
              <FileImageOutlined />
            </Tooltip>
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
              <Space>
                <BellOutlined />
                <UserAddOutlined />
                <Popover
                  style={{ padding: "0px !important" }}
                  content={
                    <GithubPicker
                      onChange={(color) => setColor(eachNote.id, color.hex)}
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
              <Button
                type="link"
                className={styles.close}
                onClick={() => toggleForm(!showForm)}
              >
                Close
              </Button>
            </Col>
          </Row>
        )}
      </Col>
      <Col span={4} />
    </Row>
  );
};

export default AddNoteForm;
