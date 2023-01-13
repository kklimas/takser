import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { TabContext, TabPanel } from "@mui/lab";
import { TaskList } from "../modules/task/task-list/TaskList";
import { useForm } from "react-hook-form";
import { createTask as addTask, fetchTasks } from "../services/task-service";
import { fetchEmployees } from "../services/employee-service";

import { CustomAlert } from "../components/alerts/CustomAlert";
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "80%",
    backgroundColor: "#635ee7",
    margin: 0,
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(1),
    color: "#4d6cdb",
    "&.Mui-selected": {
      color: "#0026ab",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export const Tasks = () => {
  const [value, setValue] = useState("0");
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [displayProgressBar, setDisplayProgressBar] = useState(false);
  const [displayOkAlert, setDisplayOkAlert] = useState(false);
  const [displayFailAlert, setDisplayFailAlert] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    findTasks();
    findEmployees();
  }, []);

  const findEmployees = () => {
    setDisplayProgressBar(true);
    fetchEmployees()
      .then((res) => {
        setEmployees(res.data);
        setDisplayProgressBar(false);
      })
      .catch((error) => {
        console.log(error);
        setDisplayProgressBar(false);
      });
  };

  const findTasks = () => {
    setDisplayProgressBar(true);
    fetchTasks()
      .then((res) => {
        setTasks(res.data);
        setDisplayProgressBar(false);
      })
      .catch((error) => {
        console.log(error);
        setDisplayProgressBar(false);
      });
  };

  const createTask = (data) => {
    addTask(data)
      .then(() => {
        setDisplayOkAlert(true);
        findTasks();
      })
      .catch((error) => console.log(error));
  };

  // handle form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data) => {
    setOpen(false);
    reset();
    createTask(data);
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  let manageData = [findTasks, setDisplayOkAlert, setDisplayFailAlert];
  const abc = () => console.log(123);
  return (
    <div className="tasks">
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="styled tabs"
            >
              <StyledTab value="0" label="All" />
              <StyledTab value="1" label="Assigned" />
              <StyledTab value="2" label="Not assigned" />
            </StyledTabs>
            <Box />

            <TabPanel value="0">
              <TaskList
                tasks={tasks}
                manageData={manageData}
                displayProgressBar={displayProgressBar}
                employees={employees}
              />
            </TabPanel>
            <TabPanel value="1">
              <TaskList
                manageData={manageData}
                tasks={tasks}
                assigned={true}
                displayProgressBar={displayProgressBar}
                employees={employees}
              />
            </TabPanel>
            <TabPanel value="2">
              <TaskList
                manageData={manageData}
                tasks={tasks}
                assigned={false}
                displayProgressBar={displayProgressBar}
                employees={employees}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          size="large"
          style={{ textTransform: "unset", marginRight: "22px" }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Create new task
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create new task</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogContentText mb={2}>
                To create new task you need to specify properties below.
              </DialogContentText>

              <TextField
                error={errors.name !== undefined}
                helperText={
                  errors.name !== undefined ? errors.name.message : ""
                }
                autoComplete="false"
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                {...register("name", {
                  required: { value: true, message: "This field is required." },
                  minLength: {
                    value: 5,
                    message: "Name should has at least 5 characters",
                  },
                  pattern: {
                    value: /^\S+$/,
                    message: "Name should not have spaces.",
                  },
                })}
              />
              <TextField
                autoFocus
                error={errors.description !== undefined}
                helperText={
                  errors.description !== undefined
                    ? errors.description.message
                    : ""
                }
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                {...register("description", {
                  required: { value: true, message: "This field is required." },
                })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button style={{ marginRight: 10 }} type="submit">
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
      <CustomAlert
        displayAlert={displayOkAlert}
        setDisplay={setDisplayOkAlert}
        type="success"
      />
      <CustomAlert
        displayAlert={displayFailAlert}
        setDisplay={setDisplayFailAlert}
        type="error"
      />
    </div>
  );
};
