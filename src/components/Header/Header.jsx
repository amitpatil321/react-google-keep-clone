import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ collapsed, setCollapsed }) => {
  return (
    <div className="keep-header">
      <MenuIcon className="trigger" onClick={() => setCollapsed(!collapsed)} />
    </div>
  );
};

export default Header;
