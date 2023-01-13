import React from "react";
import "../App.css";
import { TaskSummary } from "../modules/task/task-summary/TaskSummary";
import TaskTreeView from "../modules/task/task-tree-view/TaskTreeView";

export const TaskDetails = () => {
  return (
    <>
      <div className="task-details">
        Summary
        <TaskSummary />
      </div>
      <div className="task-details">
        <TaskTreeView></TaskTreeView>
      </div>
    </>
  );
};
