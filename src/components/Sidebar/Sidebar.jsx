import React from "react";
import { Layout, Menu } from "antd";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

import styles from "./Sidebar.module.css";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={styles.sider}
    >
      <Menu
        className={styles.leftmenu}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: (
              <LightbulbOutlinedIcon sx={{ fontSize: 40 }} fontSize="large" />
            ),
            label: "Notes",
          },
          {
            key: "2",
            icon: <NotificationsNoneOutlinedIcon fontSize="large" />,
            label: "Reminders",
          },
          {
            key: "3",
            icon: <LabelOutlinedIcon fontSize="large" />,
            label: "Personal",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
