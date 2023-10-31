import * as React from "react";
import {createTheme,ThemeProvider,Box,Button }from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import Container from '@mui/material/Container';
import './main.css'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bolder',
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

const rows = [
  createData("Task 1", "2023-10-30", "Completed", "Edit"),
  createData("Task 2", "2023-11-15", "Pending", "Edit"),
  createData("Task 3", "2023-12-05", "Completed", "Edit"),
  createData("Task 4", "2023-12-20", "Pending", "Edit"), 
];
  

export default function Main() {
  const [cleared, setCleared] = React.useState(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <React.Fragment>
      <div>
        <img
          src="http://agency.infinyweb.com/wp-content/uploads/2022/12/LGP-1-1.png"
          className="logo"
        />
      </div>
      <Container sx={{height:'90vh' , mt:5 }}>
      
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "97.5%", height: "100%" },
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ display: "flex"}}>
            <Grid container spacing={1} sx={{justifyContent:'center'}}>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Add Todo"
                  variant="outlined"
                  sx={{minwidth:'40%'}}
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
                            onClear: () => setCleared(true),
                          },
                        }}
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
                  <Button variant="contained" endIcon={<AddIcon />} sx={{ px:2 ,py:2 , color:" #18182F",backgroundColor:'#F9D72F', '&:hover': {
        opacity: 1,
        backgroundColor: '#F9D72F'
      },}}>
                    Add
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>
          <div>
          <Stack direction="row" spacing={2} sx={{justifyContent:'space-between'}}>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)} endIcon={<FilterAltOutlinedIcon />}  sx={{ px: 1, py: 1 ,color:" #18182F",backgroundColor:'#F9D72F', '&:hover': {
        opacity: 1,
        backgroundColor: '#F9D72F'}}}   >
                    Filter
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>All</MenuItem>
                    <MenuItem onClick={popupState.close}>Completed</MenuItem>
                    <MenuItem onClick={popupState.close}>pending</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <Button variant="contained" endIcon={<DeleteOutlineIcon />} sx={{ px: 1, py: 1 ,color:" #18182F",backgroundColor:'#F9D72F', '&:hover': {
        opacity: 1,
        backgroundColor: '#F9D72F'}}} align='right'>Delete All</Button>
          </Stack>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead >
                <TableRow>
                  <StyledTableCell align="left">Task</StyledTableCell>
                  <StyledTableCell align="left">Due Date</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.fat}</StyledTableCell>
                    <StyledTableCell align="left">
                <ThemeProvider theme={createTheme()}>
                  <Button
                    variant="contained"
                    sx={{ width: 60 ,color:'#18182F', backgroundColor:'#F9D72F'}}
                  >
                  <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: 60, mx: 1 , color:'#18182F',backgroundColor:'#36D399'}}
                  >
                    <CheckIcon/>
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: 60 , color:'#18182F',backgroundColor:'#F87272'}}
                  >
                    < DeleteIcon/>
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
