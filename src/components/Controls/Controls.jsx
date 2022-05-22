import React from "react";
import { Space, Tooltip, Popover } from "antd";
import { GithubPicker } from "react-color";

import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import styles from "./Controls.module.css";

const Controls = () => {
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
          content={
            <GithubPicker
              onChange={(color) => setColor(eachNote.id, color.hex)}
            />
          }
          trigger="click"
          placement="bottom"
          triangle="hide"
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

export default Controls;
