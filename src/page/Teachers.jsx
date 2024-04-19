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
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/teachers/teacherSlice";

const Teachers = () => {
  const { loading, teacherData, error } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  const [filtered, setFiltered] = useState(teacherData);
  const [addModal, setAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [teacherDatas, setTeacherDatas] = useState([]);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  useEffect(() => {
    dispatch(fetchData());
  }, [page, addModal, editModal]);
  useEffect(() => {
    setFiltered(teacherData);
  }, [teacherData]);

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

  const handleEdit = async (id) => {
    const res = await axios(`http://localhost:3000/teachers/${id}`);
    setTeacherDatas(res.data);
    editOpenModal();
  };
  const handlePage = (e, value) => {
    setPage(value);
  };
  return (
    <div>
      {loading && (
        <h1
          style={{
            position: "absolute",
            top: "370px",
            width: "100%",
            textAlign: "center",
          }}
        >
          Loading ...
        </h1>
      )}
      {error && (
        <h1
          style={{
            position: "absolute",
            top: "370px",
            width: "100%",
            textAlign: "center",
            color: "red",
          }}
        >
          {error}
        </h1>
      )}

      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="xl" sx={{ mt: 12 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Teachers
          </Typography>
          <TeacherSearchComp
            addOpenModal={addOpenModal}
            setFiltered={setFiltered}
          />
          <TeachersList
            filtered={filtered}
            setFiltered={setFiltered}
            handleEdit={handleEdit}
          />
          <TeacherModalComp addModal={addModal} addCloseModal={addCloseModal} />
          <TeacherEditModalComp
            editModal={editModal}
            editCloseModal={editCloseModal}
            teacherDatas={teacherDatas}
          />
          <Box
            width={"100%"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Stack spacing={2} mt={3} mb={10}>
              <Pagination page={page} color="primary" onChange={handlePage} />
            </Stack>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Teachers;
