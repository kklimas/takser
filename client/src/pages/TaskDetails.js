import React from "react";
import "../App.css";
import { TaskSummary } from "../components/task/task-summary/TaskSummary";
import TaskTreeView from "../components/task/task-tree-view/TaskTreeView";
import { Paper } from "@mui/material";
import { TaskResolution } from "../components/task/task-resolution/TaskResolution";

export const TaskDetails = () => {
  return (
    <>
      <Paper elevation={12} className="paper">
        Summary
        <TaskSummary />
      </Paper>
      <Paper elevation={12} className="paper">
        <TaskTreeView></TaskTreeView>
      </Paper>
      <Paper elevation={12} className="paper">
        <TaskResolution></TaskResolution>
      </Paper>
    </>
  );
};
