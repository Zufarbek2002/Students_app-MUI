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
import { useDispatch } from "react-redux";
import { addData } from "../../app/students/studentSlice";

const ModalComp = ({ addModal, addCloseModal }) => {
  const form = useForm();
  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const dispatch = useDispatch();

  const onSubmit = (student) => {
    if (
      student.firstname.length >= 2 &&
      student.lastname.length >= 2 &&
      student.group !== ""
    ) {
      setValue("group", "");
      setValue("firstname", "");
      setValue("lastname", "");
      addCloseModal();
      dispatch(addData(student));
    } else alert("Firstname or Lastname less 2 letters");
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
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} direction={"column"}>
              <Grid item>
                <TextField
                  required
                  fullWidth
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
                <div className="errors">
                  {errors.firstname && errors.firstname.message}
                </div>
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
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
                <div className="errors">
                  {errors.lastname && errors.lastname.message}
                </div>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Group</InputLabel>
                  <Select
                    required
                    id="group"
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
                  <div className="errors">
                    {errors.group && errors.group.message}
                  </div>
                </FormControl>
              </Grid>
              <DialogActions>
                <Button variant="contained" onClick={addCloseModal}>
                  Close
                </Button>
                <Button variant="contained" type="submit" color="success">
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

export default ModalComp;
