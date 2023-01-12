import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <BiIcons.BiTask />,
    cName: "nav-text",
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <BiIcons.BiGroup />,
    cName: "nav-text",
  },
];
