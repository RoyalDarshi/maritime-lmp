import axios from "axios";
import React, { useState } from "react";

const CourseContainer = ({courseData}) => {
  
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

  const handleCourseClick = (index) => {
    setSelectedCourseIndex(index === selectedCourseIndex ? null : index);
  };  
  const handleEnroll = async(courseId) => { 
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axios.post(
        "http://localhost:5000/api/users/" + userId + "/enroll",
        { courseId }
      );
      alert(data.message)      
      
    } catch (error) {
      alert(error.response.data.error)      
      
    }
  };

  return (
    <div className="course-list">
      {courseData.map((course, index) => (
        <div key={course._id} className="course-item">
          <h2 onClick={() => handleCourseClick(index)}>{course.title}</h2>
          {selectedCourseIndex === index && (
            <div className="course-details">
              <p>{course.description}</p>
              <div className="topics">
                {course.topics.map((topic) => (
                  <div key={topic._id} className="topic-item">
                    <h3>{topic.title}</h3>
                    <p>{topic.content}</p>
                  </div>
                ))}
              </div>
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course._id)}
              >
                Enroll
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContainer;
