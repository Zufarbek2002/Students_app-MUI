/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Pagination, Stack, Typography } from "@mui/material";
import { Dashboard } from "../components/Dashboard";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import TeachersList from "../components/teachersComp/TeachersList";
import TeacherSearchComp from "../components/teachersComp/TeacherSearchComp";
import TeacherModalComp from "../components/teachersComp/TeacherModalComp";
import TeacherEditModalComp from "../components/teachersComp/TeacherEditModalComp";

const Teachers = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState(data);
  const [addModal, setAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();
  const [studentData, setStudentData] = useState([]);
  const [editModal, setEditModal] = useState(false);

  const fetchApi = async () => {
    const res = await axios.get(
      `http://localhost:3000/teachers?_page=${page}&_per_page=5`
    );
    const data = await res.data;
    setData(data.data);
    setPages(data.pages);
  };
  useEffect(() => {
    fetchApi();
  }, [page, addModal, editModal]);
  useEffect(() => {
    setFiltered(data);
  }, [data]);

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
    if (
      student.firstname.length >= 2 &&
      student.lastname.length >= 2 &&
      student.group !== "" &&
      student.level !== ""
    ) {
      axios.post("http://localhost:3000/teachers", student);
    }
  };
  const handleEdit = async (id) => {
    const res = await axios(`http://localhost:3000/teachers/${id}`);
    setStudentData(res.data);
    editOpenModal();
  };
  const handlePage = (e, value) => {
    setPage(value);
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="xl" sx={{ mt: 12 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Teachers
          </Typography>
          <TeacherSearchComp
            addOpenModal={addOpenModal}
            data={data}
            setFiltered={setFiltered}
          />
          <TeachersList filtered={filtered} setFiltered={setFiltered} handleEdit={handleEdit}/>
          <TeacherModalComp
            addModal={addModal}
            addStudent={addStudent}
            addCloseModal={addCloseModal}
          />
          <TeacherEditModalComp
            editModal={editModal}
            editCloseModal={editCloseModal}
            studentData={studentData}
          />
          <Box
            width={"100%"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Stack spacing={2} mt={3} mb={10}>
              <Pagination
                count={pages}
                page={page}
                color="primary"
                onChange={handlePage}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Teachers;
