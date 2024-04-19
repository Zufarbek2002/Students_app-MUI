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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { editData } from "../../app/teachers/teacherSlice";

const TeacherEditModalComp = ({ editModal, editCloseModal, teacherDatas }) => {
  const dispatch = useDispatch();
  const [teacher, setTeacher] = useState({
    id: null,
    firstname: "",
    lastname: "",
    group: "",
    level: "",
  });
  useEffect(() => {
    setTeacher({
      id: teacherDatas.id,
      firstname: teacherDatas.firstname,
      lastname: teacherDatas.lastname,
      group: teacherDatas.group,
      level: teacherDatas.level,
    });
  }, [teacherDatas]);
  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.id]: e.target.value,
    });
  };
  const editStudent = (e) => {
    e.preventDefault()
    if (
      teacher.firstname.length >= 2 &&
      teacher.lastname.length >= 2 &&
      teacher.group !== "" &&
      teacher.level !== ""
    ) {
      dispatch(editData(teacher));
      editCloseModal();
    }
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
          <Box component="form">
            <Grid container spacing={2} direction={"column"}>
              <Grid item>
                <TextField
                  required
                  value={teacher.firstname}
                  onChange={handleChange}
                  fullWidth
                  id="firstname"
                  label="Firstname"
                  size="small"
                />
                {!teacher.firstname && (
                  <div style={{ color: "red" }}>Firstname is required</div>
                )}
              </Grid>
              <Grid item>
                <TextField
                  required
                  value={teacher.lastname}
                  onChange={handleChange}
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  size="small"
                />
                {!teacher.lastname && (
                  <div style={{ color: "red" }}>Lastname is required</div>
                )}
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Group</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Group"
                    value={teacher.group}
                    defaultValue={teacherDatas.group}
                    onChange={(e) =>
                      setTeacher({ ...teacher, group: e.target.value })
                    }
                  >
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
                    value={teacher.level}
                    defaultValue={teacherDatas.level}
                    onChange={(e) =>
                      setTeacher({ ...teacher, level: e.target.value })
                    }
                  >
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
                  type="submit"
                  onClick={editStudent}
                >
                  Edit
                </Button>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherEditModalComp;
