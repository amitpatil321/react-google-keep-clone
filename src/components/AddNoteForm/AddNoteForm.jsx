import React, { useEffect } from "react";

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

const AddNoteForm = ({
  bgColor,
  setBgColor,
  showAddNoteForm,
  toggleAddNoteForm,
  title,
  description,
  setTitle,
  setDescription,
  setTitleFocused,
  setDescFocused,
}) => {
  return (
    <Row tabIndex={0}>
      <Col span={4} />
      <Col
        span={16}
        className={styles.mainContainer}
        style={{ background: `${bgColor}` }}
      >
        {!showAddNoteForm ? (
          <div
            className={styles.addnoteinput}
            onClick={() => {
              setDescFocused(true);
              toggleAddNoteForm(true);
            }}
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
        ) : (
          <Row className={styles.noteInputForm}>
            <Col span={24}>
              <Input
                value={title}
                className={styles.title}
                bordered={false}
                placeholder="Title"
                onChange={(event) => setTitle(event.target.value)}
                // onBlur={() => saveNote()}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
              />
              <TextArea
                autoFocus
                value={description}
                className={styles.description}
                bordered={false}
                placeholder="Take a note..."
                autoSize
                onChange={(event) => setDescription(event.target.value)}
                onFocus={() => setDescFocused(true)}
                onBlur={() => setDescFocused(false)}
              />
            </Col>
            <Col span={24}>
              <Row>
                <Col span={20}>
                  <Controls type="addNote" onSelect={setBgColor} />
                </Col>
                <Col span={4}>
                  <Button
                    type="link"
                    className={styles.close}
                    onClick={() => toggleAddNoteForm(!showAddNoteForm)}
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
