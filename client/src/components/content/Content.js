import React from "react";
import "./Content.css";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import { Home } from "../../pages/Home";
import { Employees } from "../../pages/Employees";
import { Tasks } from "../../pages/Tasks";
import { TaskDetails } from "../../pages/TaskDetails";
import { useLocation } from "react-router-dom";

const SectionTitle = () => {
  const location = useLocation();

  const getsectionTitle = () => {
    let list = location.pathname.split("/").filter((item) => item !== "");
    if (list.length === 0) list.push("Home");
    let item = list.pop();
    let isId = !isNaN(String(item));
    return isId ? "Details" : item[0].toUpperCase() + item.slice(1);
  };

  return <div className="section-title">{getsectionTitle()}</div>;
};

export const Content = ({ active, view }) => {
  const getView = () => {
    switch (view) {
      case "home":
        return <Home />;
      case "employees":
        return <Employees />;
      case "tasks":
        return <Tasks />;
      case "task-details":
        return <TaskDetails />;
      default:
        return <></>;
    }
  };

  return (
    <div className={active ? "content active" : "content"}>
      <Breadcrumb />
      <SectionTitle />
      {getView()}
    </div>
  );
};
