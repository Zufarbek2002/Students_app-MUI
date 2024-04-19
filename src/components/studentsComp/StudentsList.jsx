/* eslint-disable react/prop-types */
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteData } from "../../app/students/studentSlice";

const StudentsList = ({ filtered, handleEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (confirm("Are you sure delete")) {
      dispatch(deleteData(id));
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Firstname</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Lastname</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Group</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((student, i) => (
            <TableRow hover key={student.id}>
              <TableCell sx={{ fontWeight: 700 }}>{i + 1}</TableCell>
              <TableCell>{student.firstname}</TableCell>
              <TableCell>{student.lastname}</TableCell>
              <TableCell>{student.group}</TableCell>
              <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(student.id)}
                >
                  <span>Delete</span> <Delete />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleEdit(student.id)}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <span>Edit</span> <Edit fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsList;
