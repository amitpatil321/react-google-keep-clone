import React, { useState } from "react";

import { Layout, Row, Col, Menu } from "antd";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

import styles from "./App.module.css";
import stylesSidebar from "./components/Sidebar/Sidebar.module.css";
import "antd/dist/antd.css";

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.app}>
      <Row>
        <Col span={24}>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </Col>
        <Col span={24}>
          <Layout style={{ height: "100vh" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              className={stylesSidebar.sider}
            >
              <Menu
                className={stylesSidebar.leftmenu}
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "1",
                    icon: (
                      <LightbulbOutlinedIcon
                        sx={{ fontSize: 40 }}
                        fontSize="large"
                      />
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
            <Layout className={styles.whitebg}>
              <Content
                className={[styles.whitebg, styles.nopaddingmargin].join(" ")}
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                }}
              >
                Content
              </Content>
            </Layout>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default App;
