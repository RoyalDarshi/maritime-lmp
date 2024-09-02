import React, { useState, useEffect } from "react";
import axios from "axios";
import Course from "./Course";
import { useNavigate } from "react-router-dom";

const MyCourse = ({ courses, userCourses }) => {  
  
  const getCourseProgress = (courseId) => {
    
    const userCourse = userCourses.find((uc) => uc.courseId === courseId);
    return userCourse ? userCourse.progress : 0;
  };

  const isTopicCompleted = (courseId, topicId) => {
    const userCourse = userCourses.find((uc) => uc.courseId === courseId);
    return userCourse ? userCourse.completedTopics.includes(topicId) : false;
  };

  const handleCompleteTopic = async (courseId, topicId) => {
    try {
      const userId = localStorage.getItem("userId");      
      const { data } = await axios.post(
        `http://localhost:5000/api/users/${userId}/startTopic`,
        { courseId, topicId }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-courses">
      {courses.map((course) => (
        <div key={course._id} className="course-item">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>Progress: {getCourseProgress(course._id).toFixed(2)}%</p>
          <div className="topics">
            {course.topics.map((topic) => (
              <div key={topic._id} className="topic-item">
                <h3>{topic.title}</h3>
                <p>{topic.content}</p>
                {!isTopicCompleted(course._id, topic._id) && (
                  <button
                    className="complete-topic-button"
                    onClick={() => handleCompleteTopic(course._id, topic._id)}
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourse;
