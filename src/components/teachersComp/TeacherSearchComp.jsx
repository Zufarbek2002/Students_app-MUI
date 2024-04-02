/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const TeacherSearchComp = ({ addOpenModal, data, setFiltered }) => {
  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase().trim();
    setFiltered(
      data.filter(
        (e) =>
          e.firstname.toLowerCase().includes(text) ||
          e.lastname.toLowerCase().includes(text)
      )
    );
  };
  const handleFilter = (e) => {
    const group = e.target.value;
    let filteredValue;
    if (group == "All") {
      filteredValue = data;
    } else {
      filteredValue = data.filter((data) => data.group == group);
    }
    setFiltered(filteredValue);
  };

  const handleLevelFilter = (e) => {
    const level = e.target.value;
    let filteredValue;
    if (level == "All") {
      filteredValue = data;
    } else {
      filteredValue = data.filter((data) => data.level == level);
    }
    setFiltered(filteredValue);
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        mb: 5,
        flexWrap: "wrap",
      }}
    >
      <TextField
        type="text"
        label="Searching"
        variant="outlined"
        onChange={handleSearch}
        sx={{ width: "50%" }}
      />

      <FormControl sx={{ minWidth: 120, width: "15%" }}>
        <InputLabel id="demo-simple-select-label">Group</InputLabel>
        <Select
          id="demo-simple-select"
          labelId="demo-simple-select-label"
          className="form-select w-auto"
          label="Group"
          onChange={handleFilter}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="React N34">React N34</MenuItem>
          <MenuItem value="React N35">React N35</MenuItem>
          <MenuItem value="React N45">React N45</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, width: "15%" }}>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          id="demo-simple-select"
          labelId="demo-simple-select-label"
          className="form-select w-auto"
          label="Level"
          onChange={handleLevelFilter}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
          <MenuItem value="Middle">Middle</MenuItem>
          <MenuItem value="Junior">Junior</MenuItem>
        </Select>
      </FormControl>
      <Button
        sx={{ width: "10%" }}
        variant="outlined"
        color="success"
        onClick={addOpenModal}
      >
        Add
      </Button>
    </Box>
  );
};

export default TeacherSearchComp;
