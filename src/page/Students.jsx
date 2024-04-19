/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Container, Pagination, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Dashboard } from "../components/Dashboard";
import SearchComp from "../components/studentsComp/SearchComp";
import ModalComp from "../components/studentsComp/ModalComp";
import StudentsList from "../components/studentsComp/StudentsList";
import EditModalComp from "../components/studentsComp/EditModalComp";
import { fetchData } from "../app/students/studentSlice";

const Students = () => {
  const { loading, studentData, error } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  const [filtered, setFiltered] = useState(studentData);
  const [addModal, setAddModal] = useState(false);
  const [studentDatas, setStudentData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  useEffect(() => {
    dispatch(fetchData())
  }, [page, addModal, editModal]);
  useEffect(() => {
    setFiltered(studentData);
  }, [studentData]);

  const addOpenModal = () => {
    setAddModal(true);
  };
  const addCloseModal = () => {
    setAddModal(false);
  };
  const editOpenModal = () => {
    setEditModal(true);
  };
  const editCloseModal = () => {
    setEditModal(false);
  };
  const addStudent = (student) => {
    axios.post("http://localhost:3000/students", student);
  };

  const handleEdit = async (id) => {
    const res = await axios(`http://localhost:3000/students/${id}`);
    setStudentData(res.data);
    editOpenModal();
  };
  const handlePage = (e, value) => {
    setPage(value);
  };

  return (
    <>
      {loading && <h1 style={{position: 'absolute', top: '370px', width:'100%', textAlign: 'center'}}>Loading ...</h1>}
      {error && <h1 style={{position: 'absolute', top: '370px', width:'100%', textAlign: 'center', color: 'red'}}>{error}</h1>}

      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="xl" sx={{ mt: 12 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Students
          </Typography>
          <SearchComp
            addOpenModal={addOpenModal}
            setFiltered={setFiltered}
          />
          <StudentsList
            filtered={filtered}
            setFiltered={setFiltered}
            handleEdit={handleEdit}
          />
          <ModalComp
            addModal={addModal}
            addStudent={addStudent}
            addCloseModal={addCloseModal}
          />
          <EditModalComp
            editModal={editModal}
            editCloseModal={editCloseModal}
            studentData={studentDatas}
          />
          <Box
            width={"100%"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Stack spacing={2} mt={3} mb={10}>
              <Pagination
                page={page}
                color="primary"
                onChange={handlePage}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Students;
