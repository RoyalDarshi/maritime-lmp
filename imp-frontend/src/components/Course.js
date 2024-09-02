import axios from "axios";
import React from "react";

const Course = ({ courseData }) => {
  const topics = courseData.topics || courseData.completedTopics;

  const enrollCourse = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axios.post(
        `http://localhost:5000/api/users/${userId}/enroll`,
        { courseId: courseData._id }
      );
      alert(data.msg);
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="course-card">
      <div>
        <h2>{courseData.title}</h2>
        <h4>{courseData.description}</h4>
        <h2>Topics</h2>
        {topics.map((topic) => (
          <div key={topic._id}>
            <h3>{topic.title}</h3>
            <p>{topic.content}</p>
          </div>
        ))}
        {courseData.topics && <button onClick={enrollCourse}>Enroll</button>}
      </div>
    </div>
  );
};

export default Course;
