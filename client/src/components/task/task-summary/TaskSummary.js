import React from "react";
import {
  Divider,
  Grid,
  Paper,
  styled,
  Typography,
  Box,
  Link,
} from "@mui/material";
import "./task-summary.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "status-indicator/styles.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const GridItem = (props) => {
  const [icon, subtitle, value, linked] = [
    props.icon,
    props.subtitle,
    props.value,
    props.linked,
  ];
  return (
    <Grid item xs={12} sm={12} md={6} xl={3}>
      <Item>
        <Box>
          {icon}
          <Typography fontWeight={"bold"} variant="subtitle1" component="h2">
            {subtitle}
          </Typography>
        </Box>
        {linked !== undefined ? (
          <Link href={linked}>
            <Typography variant="subtitle1" component="h2">
              {value}
            </Typography>
          </Link>
        ) : (
          <Typography variant="subtitle1" component="h2">
            {value}
          </Typography>
        )}
      </Item>
    </Grid>
  );
};

export const TaskSummary = () => {
  let data = {
    assignedTo: "Tomasz Klimas",
    priority: "MAJOR",
    status: "IN_PROGRESS",
    deadLine: "2022-02-02",
  };

  const statusStringToIndicator = (value) => {
    switch (value) {
      case "MAJOR":
        return <status-indicator intermediary pulse></status-indicator>;
      case "MINOR":
        return <status-indicator active pulse></status-indicator>;
      case "BLOCKER":
        return <status-indicator negative pulse></status-indicator>;
      case "IN_PROGRESS":
      case "ASSIGNED":
        return <status-indicator active pulse></status-indicator>;
      case "DONE":
        return <status-indicator active pulse></status-indicator>;
      default:
        return <status-indicator></status-indicator>;
    }
  };

  const formatString = (value) => {
    return value[0] + value.split("_").join(" ").slice(1).toLowerCase();
  };

  return (
    <div className="summary">
      <Box mt={2} />
      <Divider />
      <Grid mt={3} mb={3} container spacing={2}>
        <GridItem
          icon={<AssignmentIcon />}
          subtitle="Assigned To"
          value={data.assignedTo}
          linked={"#"}
        ></GridItem>
        <GridItem
          icon={<FmdBadIcon />}
          subtitle="Priority"
          value={
            <Box
              display="flex"
              gap={1}
              justifyContent="center"
              alignItems="center"
            >
              {statusStringToIndicator(data.priority)}
              {formatString(data.priority)}
            </Box>
          }
        ></GridItem>
        <GridItem
          icon={<PendingActionsIcon />}
          subtitle="Status"
          value={
            <Box
              display="flex"
              gap={2}
              justifyContent="center"
              alignItems="center"
            >
              {statusStringToIndicator(data.status)}
              {formatString(data.status)}
            </Box>
          }
        ></GridItem>
        <GridItem
          icon={<HistoryIcon />}
          subtitle="Deadline"
          value={data.deadLine}
        ></GridItem>
      </Grid>
      <Divider />
    </div>
  );
};
