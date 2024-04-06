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

const EditModalComp = ({ editModal, editCloseModal, studentData }) => {
  const [student, setStudent] = useState({
    id: null,
    firstname: "",
    lastname: "",
    group: "",
  });
  useEffect(() => {
    setStudent({
      id: studentData.id,
      firstname: studentData.firstname,
      lastname: studentData.lastname,
      group: studentData.group,
    });
  }, [studentData]);
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };
  const editStudent = async (id) => {
    if (
      student.firstname.length >= 2 &&
      student.lastname.length >= 2 &&
      student.group !== ""
    ) {
      await axios.put(`http://localhost:3000/students/${id}`, student);
      editCloseModal();
    } else alert("Firstname or Lastname less 2 letters");
  };

  return (
    <div>
      <Dialog open={editModal} onClose={editCloseModal}>
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
          <Grid container spacing={2} direction={"column"} sx={{ pt: "10px" }}>
            <Grid item>
              <TextField
                value={student.firstname}
                onChange={handleChange}
                fullWidth
                id="firstname"
                label="Firstname"
                size="small"
              />
              {!student.firstname && (
                <div className="errors">Firstname is required</div>
              )}
            </Grid>
            <Grid item>
              <TextField
                value={student.lastname}
                onChange={handleChange}
                fullWidth
                id="lastname"
                label="Lastname"
                size="small"
              />
              {!student.lastname && (
                <div className="errors">Lastname is required</div>
              )}
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

export default EditModalComp;
