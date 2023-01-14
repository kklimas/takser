import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";
import { SidebarData } from "../SidebarData";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "rgb(230,230,230)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

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
        <Box display="flex" gap={2}>
          <Link to="#" className="menu-bars" style={{ color: "white" }}>
            <BiIcons.BiMenuAltLeft onClick={showSidebar} />
          </Link>
          <Typography color="white" variant="h4">
            Tasker
          </Typography>
        </Box>

        <div className="flex-box">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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
