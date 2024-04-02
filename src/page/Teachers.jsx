/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { Dashboard } from "../components/Dashboard";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import TeachersList from "../components/teachersComp/TeachersList";
import TeacherSearchComp from "../components/teachersComp/TeacherSearchComp";
import TeacherModalComp from "../components/teachersComp/TeacherModalComp";

const Teachers = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState(data);
  const [addModal, setAddModal] = useState(false);
  const [page, setPage] = useState(1);

  const fetchApi = async () => {
    const res = await axios.get(
      `http://localhost:3000/teachers?_page=${page}&_per_page=5`
    );
    const data = await res.data;
    setData(data.data);
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
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="xl" sx={{ mt: 12 }}>
        <Typography variant="h5" sx={{mb: 4}}>Teachers</Typography>
          <TeacherSearchComp addOpenModal={addOpenModal} data={data} setFiltered={setFiltered}/>
          <TeachersList  filtered={filtered} setFiltered={setFiltered} />
          <TeacherModalComp
            addModal={addModal}
            addStudent={addStudent}
            addCloseModal={addCloseModal}
          />
        </Container>
      </Box>
    </div>
  );
};

export default Teachers;
