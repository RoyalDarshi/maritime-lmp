import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseContainer from "./CourseContainer";

const Home = ({courseData}) => {
  
  const navigate = useNavigate();
  const role = localStorage.getItem("role");    

  useEffect(() => {
    const token = localStorage.getItem("userId") && role;
    if (!token) {
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      navigate("/");
    }
  }, [navigate, role]);

  return (
    <div>
      <CourseContainer courseData={courseData} />
    </div>
  );
};

export default Home;
