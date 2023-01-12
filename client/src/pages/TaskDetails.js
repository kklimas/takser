import React from "react";
import "../App.css";
import { TaskSummary } from "../components/task_summary/TaskSummary";

export const TaskDetails = () => {
  return (
    <>
      <div className="task-details">
        <TaskSummary />
      </div>
      <div className="task-details">TaskDetails</div>;
    </>
  );
};
