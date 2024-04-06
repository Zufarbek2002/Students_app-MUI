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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

const TeacherModalComp = ({ addModal, addCloseModal, addStudent }) => {
  const form = useForm();
  const { register, handleSubmit, setValue, formState } = form;
  const { errors } = formState;
  const onSubmit = (student) => {
    addStudent(student);
    addCloseModal();
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("group", "");
    setValue("level", "");
  };

  return (
    <div>
      <Dialog open={addModal} onClose={addCloseModal}>
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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ padding: 5 }}
          >
            <Grid container spacing={2} direction={"column"}>
              <Grid item>
                <TextField
                  style={{ width: "350px" }}
                  required
                  id="firstname"
                  label="Firstname"
                  size="small"
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "Firstname is required",
                    },
                  })}
                />
                <div style={{ width: "100%", color: "red", padding: 5 }}>
                  {errors.firstname && errors.firstname.message}
                </div>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="lastname"
                  label="Lastname"
                  size="small"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "Lastname is required",
                    },
                  })}
                />
                <div style={{ color: "red", padding: 5 }}>
                  {errors.lastname && errors.lastname.message}
                </div>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Group</InputLabel>
                  <Select
                    required
                    id="group"
                    name="group"
                    labelId="demo-simple-select-label"
                    label="Group"
                    {...register("group", {
                      required: {
                        value: true,
                        message: "Group is required",
                      },
                    })}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="React N34">React N34</MenuItem>
                    <MenuItem value="React N35">React N35</MenuItem>
                    <MenuItem value="React N45">React N45</MenuItem>
                  </Select>
                  <span style={{ color: "red", padding: 5 }}>
                    {errors.group && errors.group.message}
                  </span>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Level</InputLabel>
                  <Select
                    required
                    id="level"
                    name="level"
                    labelId="demo-simple-select-label"
                    label="Level"
                    {...register("level", {
                      required: {
                        value: true,
                        message: "Level is required",
                      },
                    })}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                    <MenuItem value="Middle">Middle</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                  </Select>
                  <span style={{ color: "red", padding: 5 }}>
                    {errors.level && errors.level.message}
                  </span>
                </FormControl>
              </Grid>
              <DialogActions>
                <Button variant="contained" onClick={addCloseModal}>
                  Close
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Add
                </Button>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherModalComp;
