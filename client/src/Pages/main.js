import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import "./main.css";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bolder",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// Inside your Add button click handler


export default function Main() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [cleared, setCleared] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskText, setTaskText] = useState(""); // Add the taskText state
  const [selectedTaskData, setSelectedTaskData] = useState({ task: '', dueDate: null });


  // const handleEditClick = (task) => {
  //   setSelectedTask(task);
  //   setSelectedDate(new Date(task.dueDate)); // Convert dueDate to a Date object
  //   setTaskText(task.task); // Populate the task text
  // };
  // const handleEditClick = (task) => {
  //   setSelectedTask(task);
  //   setSelectedDate(new Date(task.dueDate)); // Convert dueDate to a Date object
  //   setTaskText(task.task); // Populate the task text
    
  //   // Set the selected task data
  //   setSelectedTaskData({
  //     task: task.task,
  //     dueDate: new Date(task.dueDate),
  //   });
  // };
  //*********************************
  // const handleEditClick = (task) => {
  //   setSelectedTask(task);
    
  //   // Convert dueDate to a dayjs object
  //   const dueDate = task.dueDate ? dayjs(task.dueDate) : null;
  
  //   setSelectedDate(dueDate);
  //   setTaskText(task.task);
  
  //   // Set the selected task data
  //   setSelectedTaskData({
  //     task: task.task,
  //     dueDate: dueDate,
  //   });
  // };
  const handleEditClick = (task) => {
    // Check if selectedTask is already set, which means we are editing an existing task
    if (selectedTask) {
      // Update the existing task
      updateTask(selectedTask._id, {
        task: selectedTaskData.task,
        dueDate: selectedDate ? selectedDate.toISOString() : null,
      });
    } else {
      // Set selectedTask if it's not already set
      setSelectedTask(task);
      const dueDate = task.dueDate ? dayjs(task.dueDate) : null;
      setSelectedDate(dueDate);
      setTaskText(task.task);
  
      setSelectedTaskData({
        task: task.task,
        dueDate: dueDate,
      });
    }
  };
  
  const getDefaultDueDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };
  
  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        // const response = await fetch("http://localhost:8000/api/tasks");
        const response = await axios.get("http://localhost:8000/api/tasks", {
        headers: {
          token: `${token}`, // Include your authentication token here
        },
      });
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setTasks(data);
        } else {
          // Handle errors, display error message, etc.
          console.error(
            "Error fetching tasks:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);  
  
  const addTask = async (selectedDate) => {
    try {
       const task = document.getElementById("outlined-basic").value;
       //const dueDate = selectedDate && selectedDate.toISOString();
      //const task = selectedTaskData.task;
      //const dueDate = selectedDate ? selectedDate.toISOString() : null;
      const dueDate = selectedDate ? selectedDate.toISOString() : getDefaultDueDate();
        
      if (!dueDate) {
        console.error("Invalid due date");
        return;
      }
      // const response = await fetch("http://localhost:8000/api/tasks", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ task, dueDate }),
      // });
      const token = localStorage.getItem("token");  
      const response = await axios.post("http://localhost:8000/api/tasks", {
        task,
        dueDate,
      }, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        }
      });
  
      if (response.status === 201) {
        // Task created successfully. You can update your UI accordingly.
        console.log("Task created successfully");
      } else {
        // Handle errors, display error message, etc.
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      // const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(updatedTask),
      const token = localStorage.getItem("token"); // Get the authentication token
      const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}`, updatedTask, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        }
      });
  
      if (response.status === 200) {
        const data = response.data;
        // Task updated successfully. You can update your UI accordingly.
        console.log("Task updated successfully",data);
        // After updating, reset selectedTask to null to exit the edit mode
        setSelectedTask(null);
      } else {
        // Handle errors, display error message, etc.
        const data = response.data;
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      // const response = await fetch(
      //   `http://localhost:8000/api/tasks/${taskId}`,
      //   {
      //     method: "DELETE",
      //   }
      const token = localStorage.getItem("token"); // Get the authentication token
      
      const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
        headers: {
          token: `${token}`,
        }}
      );

      if (response.status === 200) {
        // Task deleted successfully. Update the tasks state to remove the deleted task.
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        console.log("Task deleted successfully");
      } else {
        // Handle errors, display error message, etc.
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const toggleStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
      const response = await fetch(
        `http://localhost:8000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.status === 200) {
        // Task status updated successfully. Update the tasks state with the new status.
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
        console.log("Task status updated successfully");
      } else {
        // Handle errors, display error message, etc.
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/tasks/deleteall",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if needed
          },
        }
      );
      if (response.status === 200) {
         
        setTasks([]);
        console.log("All tasks deleted successfully");
      } else {
        // Handle errors, display error message, etc.
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting all tasks", error);
    }
  };

  const filterTasks = async (status) => {
    try {
      const response = await fetch("http://localhost:8000/api/tasks");
      if (response.status === 200) {
        const data = await response.json();
        // Filter the tasks based on the status
        const filteredTasks = data.filter((task) => task.status === status);
        setTasks(filteredTasks);
      } else {
        // Handle errors, display error message, etc.
        console.error(
          "Error fetching tasks:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const dueDate = '2023-10-31'; // Replace with your actual date string
const dueDateObj = dayjs(dueDate).toDate(); // Convert to a JavaScript Date object

  return (
    <React.Fragment>
      <div>
        <img
          src="http://agency.infinyweb.com/wp-content/uploads/2022/12/LGP-1-1.png"
          className="logo"
        />
      </div>
      <Container sx={{ mt: 5 }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "97.5%" },
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ display: "flex" }}>
            <Grid container spacing={1} sx={{ justifyContent: "center" }}>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Add Todo"
                  variant="outlined"
                  sx={{ minwidth: "40%" }}
                  //value={taskText}  Set the value of the text field
                  value={selectedTaskData.task}
                  onChange={(e) => setSelectedTaskData({ ...selectedTaskData, task: e.target.value })}
                  //onChange={(e) => setTaskText(e.target.value)}  Update the task text
                />
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      // display: 'flex',
                      // justifyContent: 'center',
                      // position: 'relative',
                    }}
                  >
                    <DemoItem>
                      <DatePicker
                        // sx={{ width: 230 }}
                        slotProps={{
                          field: {
                            clearable: true,
                            onClear: () => {
                              setCleared(true);
                              setSelectedDate(null); // Clear the selected date
                            },
                          },
                        }}
                        value={selectedTaskData.dueDate}
                        //value={selectedDate}
                        //onChange={(newDate) => setSelectedDate(newDate)} // Update the selected date
                      />
                    </DemoItem>

                    {cleared && (
                      <Alert
                        sx={{ position: "absolute", bottom: 30, right: 30 }}
                        severity="success"
                      >
                        Field cleared!
                      </Alert>
                    )}
                  </Box>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2}>
                <Stack direction="row">
                  <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{
                      px: 2,
                      py: 2,
                      color: " #18182F",
                      backgroundColor: "#F9D72F",
                      "&:hover": {
                        opacity: 1,
                        backgroundColor: "#F9D72F",
                      },
                    }}
                    onClick={() => addTask(selectedDate)}
                  >
                    Add
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>
          <div>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              {/* <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      {...bindTrigger(popupState)}
                      endIcon={<FilterAltOutlinedIcon />}
                      sx={{
                        px: 1,
                        py: 1,
                        color: " #18182F",
                        backgroundColor: "#F9D72F",
                        "&:hover": {
                          opacity: 1,
                          backgroundColor: "#F9D72F",
                        },
                      }}
                      
                    >
                      Filter
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>All</MenuItem>
                      <MenuItem onClick={popupState.close} onClick={() => filterTasks("Completed")}>Completed</MenuItem>
                      <MenuItem onClick={popupState.close} onClick={() => filterTasks("pending")}>pending</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState> */}
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      {...bindTrigger(popupState)}
                      endIcon={<FilterAltOutlinedIcon />}
                      sx={{
                        px: 1,
                        py: 1,
                        color: " #18182F",
                        backgroundColor: "#F9D72F",
                        "&:hover": {
                          opacity: 1,
                          backgroundColor: "#F9D72F",
                        },
                      }}
                    >
                      Filter
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={() => filterTasks("All")}>
                        All
                      </MenuItem>
                      <MenuItem onClick={() => filterTasks("Completed")}>
                        Completed
                      </MenuItem>
                      <MenuItem onClick={() => filterTasks("Pending")}>
                        Pending
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>

              <Button
                variant="contained"
                endIcon={<DeleteOutlineIcon />}
                sx={{
                  px: 1,
                  py: 1,
                  color: " #18182F",
                  backgroundColor: "#F9D72F",
                  "&:hover": {
                    opacity: 1,
                    backgroundColor: "#F9D72F",
                  },
                }}
                align="right"
                onClick={deleteAllTasks}
              >
                Delete All
              </Button>
            </Stack>
          </div>
          <TableContainer
            component={Paper}
            sx={{ height: "400px", overflowX: "hidden", overflowY: "auto" }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Task</StyledTableCell>
                  <StyledTableCell align="left">Due Date</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <StyledTableRow key={task._id}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {task.task}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {task.dueDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {task.status}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <ThemeProvider theme={createTheme()}>
                        <Button
                          variant="contained"
                          sx={{
                            width: 60,
                            color: "#18182F",
                            backgroundColor: "#F9D72F",
                          }}
                          onClick={() => handleEditClick(task)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: 60,
                            mx: 1,
                            color: "#18182F",
                            backgroundColor: "#36D399",
                          }}
                          onClick={() => toggleStatus(task._id, task.status)}
                          style={{ cursor: "pointer" }}
                        >
                          <CheckIcon />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: 60,
                            color: "#18182F",
                            backgroundColor: "#F87272",
                          }}
                          onClick={() => deleteTask(task._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </ThemeProvider>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </React.Fragment>
  );
}
