/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const TeacherModalComp = ({ addModal, addCloseModal, addStudent }) => {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    group: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addCloseModal();
    addStudent(student);
    setStudent({
      firstname: "",
      lastname: "",
      group: "",
    });
  };

  return (
    <div>
      <Dialog open={addModal}>
        <DialogTitle>
          <Typography>Add modal</Typography>
          <IconButton
            aria-label="close"
            onClick={addCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: "100%", mt: 2 }}>
          <Grid container spacing={2} direction={"column"}>
            <Grid item>
              <TextField
                value={student.firstname}
                onChange={handleChange}
                fullWidth
                id="firstname"
                label="Firstname"
                size="small"
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                value={student.lastname}
                onChange={handleChange}
                fullWidth
                id="lastname"
                label="Lastname"
                size="small"
              ></TextField>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Group"
                  onChange={(e) =>
                    setStudent({ ...student, group: e.target.value })
                  }
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="React N34">React N34</MenuItem>
                  <MenuItem value="React N35">React N35</MenuItem>
                  <MenuItem value="React N45">React N45</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Level"
                  onChange={(e) =>
                    setStudent({ ...student, level: e.target.value })
                  }
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                  <MenuItem value="Middle">Middle</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <DialogActions>
              <Button variant="contained" onClick={addCloseModal}>
                Close
              </Button>
              <Button variant="contained" color="success" onClick={handleAdd}>
                Add
              </Button>
            </DialogActions>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherModalComp;
