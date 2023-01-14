import React from "react";
import styles from "./TaskTreeView.module.css";
import {
  Grid,
  Typography,
  Box,
  Link,
  Divider,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoIcon from "@mui/icons-material/Info";

const task = {
  id: 0,
  name: "task-00",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  children: [
    {
      id: 1,
      name: "task-01",
      children: [
        {
          id: 2,
          name: "task-02",
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: "task-03",
      children: [
        {
          id: 4,
          name: "task-04",
          children: [],
        },
        {
          id: 5,
          name: "task-05",
          children: [],
        },
        {
          id: 6,
          name: "task-06",
          children: [],
        },
      ],
    },
    {
      id: 7,
      name: "task-07",
      children: [
        {
          id: 8,
          name: "task-08",
          children: [],
        },
      ],
    },
  ],
};

let key = 0;

function TaskTreeView() {
  const listNodes = (node) => {
    return node.children.map((child) => {
      key++;
      return (
        <TreeItem key={key} nodeId={`${key}`} label={child.name}>
          {child.children.map((child) => {
            key++;
            return (
              <TreeItem
                key={key}
                nodeId={`${key}`}
                label={<Link href={`/tasks/${child.id}`}>{child.name}</Link>}
              />
            );
          })}
        </TreeItem>
      );
    });
  };

  return (
    <div className={styles.TaskTreeView}>
      <Grid container spacing={2}>
        <Grid item md={12} xl={8} mb={4}>
          <Typography fontWeight="bold" textAlign="center" variant="h3">
            {task.name}
          </Typography>
          <Divider />
          <Box mt={2}>
            <Typography variant="subtitle1">{task.description}</Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          md={12}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Paper elevation={4} className="tree">
            <Typography fontWeight="bold" textAlign="center" variant="h4">
              Dependency tree
              <Tooltip
                title={`Children of current task. To do ${task.name} you should finish them.`}
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <Box mt={2} />
            <TreeView
              aria-label="task hierarchy"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
              }}
            >
              {listNodes(task)}
            </TreeView>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

TaskTreeView.propTypes = {};

TaskTreeView.defaultProps = {};

export default TaskTreeView;
