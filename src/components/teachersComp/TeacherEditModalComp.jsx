/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const TeacherEditModalComp = ({ editModal, editCloseModal, studentData }) => {
  const [student, setStudent] = useState({
    id: null,
    firstname: "",
    lastname: "",
    group: "",
    level: "",
  });
  useEffect(() => {
    setStudent({
      id: studentData.id,
      firstname: studentData.firstname,
      lastname: studentData.lastname,
      group: studentData.group,
      level: studentData.level,
    });
  }, [studentData]);
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };
  const editStudent = async(id) => {
    await axios.put(`http://localhost:3000/teachers/${id}`, student);
    editCloseModal();
  };
  return (
    <div>
      <Dialog open={editModal}>
        <DialogTitle>
          <Typography>Edit modal</Typography>
          <IconButton
            aria-label="close"
            onClick={editCloseModal}
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
                  value={student.group}
                  defaultValue={studentData.group}
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
                  label="Group"
                  value={student.level}
                  defaultValue={studentData.level}
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
              <Button variant="contained" onClick={editCloseModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => editStudent(student.id)}
              >
                Edit
              </Button>
            </DialogActions>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherEditModalComp;
