import React from "react";
import PropTypes from "prop-types";
import styles from "./TaskTreeView.module.css";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TaskTreeView = () => (
  <div className={styles.TaskTreeView}>
    <TreeView
      aria-label="task hierarchy"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <TreeItem nodeId="1" label="Make a dinner">
        <TreeItem nodeId="2" label="Go to grocery and some other shops" />
      </TreeItem>
      <TreeItem nodeId="5" label="Clean up home">
        <TreeItem nodeId="10" label="Invite someone to help you" />
        <TreeItem nodeId="6" label="Buy things to do so">
          <TreeItem nodeId="8" label="Go to shop" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  </div>
);

TaskTreeView.propTypes = {};

TaskTreeView.defaultProps = {};

export default TaskTreeView;
