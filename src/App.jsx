import React, { useState } from "react";

import { Layout, Row, Col, Menu } from "antd";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import ListNotes from "./components/ListNotes/ListNotes";

import styles from "./App.module.css";
import "antd/dist/antd.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const { Content } = Layout;

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
            <Sidebar collapsed={collapsed} />
            <Layout className={styles.whitebg}>
              <Content
                className={[styles.whitebg, styles.nopaddingmargin].join(" ")}
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <ListNotes />
              </Content>
            </Layout>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default App;
