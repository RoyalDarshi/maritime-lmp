import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import MyCourse from "./components/MyCourse";
import Layout from "./components/Layout";
import CreateCourse from "./components/CreateCourse";
import axios from "axios";

const App = () => {
  const [courseData,setCourseDat]=useState([]);
  const [userCourseData,setUserCourseDat]=useState([]);
  const fetchData=async () => {
    try {
      const userId = localStorage.getItem("userId");
      const userCourse= await axios.get(
        `http://localhost:5000/api/users/${userId}/progress`
      );
      const { data } = await axios.get(
        "http://localhost:5000/api/courses/courses"
      );  
      setCourseDat(data)    
      setUserCourseDat(userCourse.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Home courseData={courseData} />
            </Layout>
          }
        />
        <Route
          path="/mycourse"
          element={
            <Layout>
              <MyCourse courses={courseData} userCourses={userCourseData} />
            </Layout>
          }
        />
        <Route
          path="/create-course"
          element={
            <Layout>
              <CreateCourse />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
