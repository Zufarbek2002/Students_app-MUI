/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { Dashboard } from "../components/Dashboard";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchComp from "../components/studentsComp/SearchComp";
import ModalComp from "../components/studentsComp/ModalComp";
import StudentsList from "../components/studentsComp/StudentsList";

const Students = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState(data);
//   const [studentData, setStudentData] = useState([]);
  const [addModal, setAddModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
  const [page, setPage] = useState(1);
//   const [pages, setPages] = useState();

  const fetchApi = async () => {
    const res = await axios.get(
      `http://localhost:3000/students?_page=${page}&_per_page=5`
    );
    const data = await res.data;
    setData(data.data);
    // setPages(data.pages);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  useEffect(() => {
    setFiltered(data);
  }, [data]);

  const addOpenModal = () => {
    setAddModal(true);
  };
  const addCloseModal = () => {
    setAddModal(false);
  };
//   const editOpenModal = () => {
//     setEditModal(true);
//   };
//   const editCloseModal = () => {
//     setEditModal(false);
//   };
  const addStudent = (student) => {
    if (
      student.firstname.length >= 2 &&
      student.lastname.length >= 2 &&
      student.group !== ""
    ) {
      axios.post("http://localhost:3000/students", student);
    }
  };
//   const editStudent = (student) => {
//     axios.put(`http://localhost:3000/students/${id}`, student);
//   };
//   const handleEdit = async (id) => {
//     const res = await axios(`http://localhost:3000/students/${id}`);
//     setStudentData(res.data);
//     editOpenModal();
//   };
//   const handlePrev = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };
//   const handleNext = () => {
//     setPage(page + 1);
//   };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="xl" sx={{ mt: 12 }}>
            <Typography variant="h5" sx={{mb: 4}}>Students</Typography>
          <SearchComp addOpenModal={addOpenModal} data={data} setFiltered={setFiltered}/>
          <StudentsList  filtered={filtered} setFiltered={setFiltered} />
          <ModalComp
            addModal={addModal}
            addStudent={addStudent}
            addCloseModal={addCloseModal}
          />
          {/* <EditModalComp
            editModal={editModal}
            editStudent={editStudent}
            editCloseModal={editCloseModal}
          /> */}
        </Container>
      </Box>
    </>
  );
};

export default Students;
