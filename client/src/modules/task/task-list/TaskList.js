import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blue, green, orange, red, yellow } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as FiIcons from "react-icons/fi";
import {
  deleteTasks,
  assignTasks as assign,
} from "../../../services/task-service";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    textAlign: "center",
    sortable: false,
    disableColumnMenu: false,
    renderCell: (param) => (
      <div>
        <Chip variant="outlined" size="small" label={param.id} />
        <IconButton aria-label="details" color="primary">
          <Link to={"/tasks/" + param.id}>
            <MdIcons.MdInfoOutline style={{ color: "primary" }} />
          </Link>
        </IconButton>
      </div>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 130,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "employee",
    headerName: "Assigned to",
    width: 130,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "creationDate",
    headerName: "Creation Date",
    width: 250,
    disableColumnMenu: true,
  },
  {
    field: "deadLine",
    headerName: "Deadline",
    width: 250,
    disableColumnMenu: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 230,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      let label = params.value[0] + params.value.slice(1).toLowerCase();
      let icon = {};
      let style = {};
      switch (params.value) {
        case "CREATED":
          icon = (
            <FaIcons.FaHammer style={{ fill: orange[500], fontSize: 15 }} />
          );
          style = {
            color: orange[500],
            borderColor: orange[500],
          };
          break;
        case "DONE":
          icon = (
            <AiIcons.AiOutlineCheck
              style={{ fill: green[500], fontSize: 15 }}
            />
          );
          style = {
            color: green[500],
            borderColor: green[500],
          };
          break;

        case "IN_PROGRESS":
          icon = (
            <GiIcons.GiProgression style={{ fill: blue[500], fontSize: 15 }} />
          );
          style = {
            color: blue[500],
            borderColor: blue[500],
          };
          break;
        case "ASSIGNED":
          icon = (
            <MdIcons.MdAssignment style={{ fill: blue[500], fontSize: 15 }} />
          );
          style = {
            color: blue[500],
            borderColor: blue[500],
          };
          break;
        default:
          icon = (
            <IoIcons.IoMdCreate style={{ fill: red[500], fontSize: 15 }} />
          );
          style = {
            color: red[500],
            borderColor: red[500],
          };
          break;
      }
      style = {
        ...style,
        padding: "10px",
        fontWeight: "bold",
      };

      return (
        <Chip
          style={style}
          variant="outlined"
          size="small"
          label={label.split("_").join(" ")}
          icon={icon}
        />
      );
    },
  },
];

const divStyles = {
  minHeight: 425,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const progressBarStyle = {
  marginTop: "40px",
};

export const TaskList = ({
  manageData,
  tasks,
  assigned,
  displayProgressBar,
  employees,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [displaySelection, setDisplaySelection] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [fetchTasks, setOkAlert, setFailAlert] = manageData;
  const [openDel, setOpenDel] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [dates, setDates] = useState([]);
  const [employee, setEmployee] = useState("");

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleClickOpenAssign = () => {
    setOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  const handleCloseAndConfirm = (event) => {
    setOpenDel(false);
    deleteTasks(selectionModel)
      .then(() => {
        event.preventDefault();
        setOkAlert(true);
        fetchTasks();
      })
      .catch(() => setFailAlert(true));
  };

  const handleCloseAssignAndConfirm = () => {
    setOpenAssign(false);
    let tasksDTO = {
      employeeId: employee.id,
      tasks: selectedTasks.map((task, index) => {
        return {
          taskId: task.id,
          deadLine: dates[index],
        };
      }),
    };

    assign(tasksDTO)
      .then(() => {
        setOkAlert(true);
        fetchTasks();
      })
      .catch(() => setFailAlert(true));
  };

  const handleDateChange = (d, index) => {
    dates[index] = d.$d;
    setDates(dates);
  };

  const hideForAll =
    assigned !== true
      ? {
          employee: false,
          deadLine: false,
        }
      : {};

  const mapListToRows = () => {
    let tasksList = tasks.map((task) => {
      let employeeName =
        task.employee == null
          ? ""
          : task.employee.firstName + " " + task.employee.lastName;
      return {
        id: task.id,
        name: task.name,
        employee: employeeName,
        description: task.description,
        creationDate: task.createdAt,
        deadLine: task.deadLine,
        status: task.status,
      };
    });
    if (assigned === true)
      return tasksList.filter((task) => task.employee !== "");
    if (assigned === false)
      return tasksList.filter((task) => task.employee === "");
    return tasksList;
  };

  const findTasksById = (ids) => {
    let res = ids.map((id) => {
      return tasks.filter((task) => task.id === id)[0];
    });
    return res;
  };

  const removeTasks = () => {
    setSelectedTasks(findTasksById(selectionModel));
    handleClickOpenDel();
  };

  const assignTasks = () => {
    setSelectedTasks(findTasksById(selectionModel));
    setDates(selectionModel.map((item) => new Date()));
    handleClickOpenAssign();
  };

  const refreshTasks = () => {
    setDisplaySelection(false);
    setSelectionModel([]);
    fetchTasks();
  };

  return (
    <div style={divStyles}>
      <div
        style={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Button
          style={{ textTransform: "unset" }}
          startIcon={<FaIcons.FaLayerGroup />}
          onClick={() => {
            setDisplaySelection(!displaySelection);
            setSelectionModel([]);
          }}
          variant="contained"
        >
          Group actions
        </Button>
        <Button
          style={{ textTransform: "unset" }}
          startIcon={<FiIcons.FiRefreshCcw />}
          onClick={() => refreshTasks()}
          variant="outlined"
        >
          Refresh
        </Button>
        {displaySelection && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              style={{ textTransform: "unset" }}
              disabled={selectionModel.length === 0}
              startIcon={<MdIcons.MdDeleteOutline />}
              size="small"
              color="error"
              onClick={() => removeTasks()}
              variant="outlined"
            >
              Delete tasks
            </Button>
            <Button
              disabled={selectionModel.length === 0}
              style={{ textTransform: "unset" }}
              startIcon={<MdIcons.MdAssignmentTurnedIn />}
              size="small"
              color="success"
              onClick={() => assignTasks()}
              variant="outlined"
            >
              Assign tasks
            </Button>
          </div>
        )}
      </div>
      {displayProgressBar && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress style={progressBarStyle} size="100px" />
        </Box>
      )}
      {!displayProgressBar && (
        <DataGrid
          style={{ width: "100%" }}
          checkboxSelection={displaySelection}
          rows={mapListToRows()}
          columnVisibilityModel={hideForAll}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          onSelectionModelChange={(model) => {
            if (model.length > 0) setSelectionModel(model);
          }}
          selectionModel={selectionModel}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      )}
      <div>
        <Dialog
          open={openDel}
          onClose={handleCloseDel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure to delete theese task?
          </DialogTitle>
          <DialogContent>
            <div>
              {selectedTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDel}>Cancel</Button>
            <Button color="error" onClick={handleCloseAndConfirm} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openAssign}
          onClose={handleCloseAssign}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Assign tasks to employee and chose the dead line.
          </DialogTitle>
          <DialogContent>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={employee}
                  label="Employee"
                  onChange={(event) => {
                    setEmployee(event.target.value);
                  }}
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee}>
                      {employee.firstName + " " + employee.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedTasks.map((task, index) => (
                <div key={task.id}>
                  <Typography mt={3}>{task.name}</Typography>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <MobileDatePicker
                          label="Deadline"
                          inputFormat="MM/DD/YYYY"
                          onChange={(date) => handleDateChange(date, index)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAssign}>Cancel</Button>
            <Button
              color="success"
              onClick={handleCloseAssignAndConfirm}
              autoFocus
            >
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
