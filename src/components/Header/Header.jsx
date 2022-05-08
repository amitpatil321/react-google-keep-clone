import React from "react";
import { Row, Col } from "antd";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Header.module.css";

const Header = ({ collapsed, setCollapsed }) => {
  return (
    <Row className={styles.header}>
      <Col
        span={1}
        className={styles.menuIconContainer}
        onClick={() => setCollapsed(!collapsed)}
      >
        <MenuIcon
          className={styles.menuIcon}
          onClick={() => setCollapsed(!collapsed)}
        />
      </Col>
      <Col span={2}>
        <img src={`/assets/logo.png`} alt="logo" className={styles.logo} />
      </Col>
      <Col span={21}>Search</Col>
    </Row>
  );
};

export default Header;
