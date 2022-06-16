import React, { useState } from "react";
import { Space, Tooltip, Popover } from "antd";
import { GithubPicker } from "react-color";

import { doc, updateDoc } from "firebase/firestore";

import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import db from "@/config/firebase";
import styles from "./Controls.module.css";

const Controls = ({ type, notes, note, onSelect, setNotes }) => {
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
    <div
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Space>
        <Tooltip placement="bottom" title="Remind me">
          <AddAlertOutlinedIcon fontSize="small" />
        </Tooltip>
        <Tooltip placement="bottom" title="Collaborator">
          <PersonAddAltOutlinedIcon fontSize="small" />
        </Tooltip>
        <Popover
          style={{ padding: "0px !important" }}
          trigger="click"
          placement="bottom"
          triangle="hide"
          content={
            <GithubPicker
              triangle="hide"
              colors={[
                "#FCCB00",
                "#FFFFFF",
                "#b8b8ff",
                "#ffeedd",
                "#9ceaef",
                "#78a1bb",
                "#EB9694",
                "#FAD0C3",
                "#FEF3BD",
                "#C1E1C5",
                "#BEDADC",
                "#C4DEF6",
                "#73bfb8",
                "#BED3F3",
              ]}
              onChange={(color) => {
                if (type === "listNote") setColor(note?.id, color.hex);
                else onSelect(color.hex);
              }}
            />
          }
        >
          <Tooltip placement="bottom" title="Background options">
            <ColorLensOutlinedIcon fontSize="small" />
          </Tooltip>
        </Popover>
        <Tooltip placement="bottom" title="Add image">
          <ImageOutlinedIcon fontSize="small" />
        </Tooltip>
        <Tooltip placement="bottom" title="Add image">
          <ArchiveOutlinedIcon fontSize="small" />
        </Tooltip>
        <Tooltip placement="bottom" title="More">
          <MoreVertOutlinedIcon fontSize="small" />
        </Tooltip>
      </Space>
    </div>
  );
};

export default React.memo(Controls);
