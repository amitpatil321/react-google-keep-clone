import React from "react";
import { Row, Col, Input } from "antd";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import styles from "./Header.module.css";
import appStyles from "../../App.module.css";

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
      <Col span={4}>
        <img src={`/assets/logo.png`} alt="logo" className={styles.logo} />
        <span className={styles.moduleName}>Notes</span>
      </Col>
      <Col span={19}>
        <Row>
          <Col span={14}>
            <Input
              className={[styles.searchInput, appStyles.input].join(" ")}
              size="large"
              placeholder="Search"
              prefix={<SearchOutlinedIcon />}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
