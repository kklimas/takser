import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";
import { SidebarData } from "../SidebarData";
import "./Navbar.css";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Navbar({ changeNavbarVisibility }) {
  const [sidebar, setSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showSidebar = () => {
    changeNavbarVisibility(!sidebar);
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars" style={{ color: "white" }}>
          <BiIcons.BiMenuAltLeft onClick={showSidebar} />
        </Link>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ fontSize: "1.6rem", marginRight: "2rem" }}
          >
            <BiIcons.BiUser style={{ color: "white" }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} className="menu-item">
              <CgIcons.CgProfile
                style={{ color: "#0026ab", fontSize: "1.4rem" }}
              />
              <b>Profile</b>
            </MenuItem>

            <MenuItem onClick={handleClose} className="menu-item">
              <BiIcons.BiLogOutCircle
                style={{ color: "#0026ab", fontSize: "1.4rem" }}
              />
              <b>Logout</b>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
            <div className="logo">
              <FaIcons.FaReact />
              <span style={{ marginLeft: "4px" }}>Super Company SA</span>
            </div>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
