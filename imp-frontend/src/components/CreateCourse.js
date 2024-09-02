import axios from "axios";
import React, { useState } from "react";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([{ title: "", content: "" }]);

  const handletitleChange = (e) => setTitle(e.target.value);
  const handledescriptionChange = (e) => setDescription(e.target.value);

  const handleTopicChange = (index, field, value) => {
    const newTopics = [...topics];
    newTopics[index][field] = value;
    setTopics(newTopics);
  };

  const addTopic = () => {
    setTopics([...topics, { title: "", content: "" }]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/api/courses", {
        title,
        description,
        topics,
      });
      alert("course created successfully");
      setTopics([{ title: "", content: "" }]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="course-form">
        <div>
          <label>Course Title:</label>
          <input
            type="text"
            value={title}
            onChange={handletitleChange}
            required
          />
        </div>
        <div>
          <label>Course Description:</label>
          <textarea
            value={description}
            onChange={handledescriptionChange}
            required
          />
        </div>
        <div>
          <label>Topics:</label>
          <div className="textarea-container">
            {topics.map((topic, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Topic Title"
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  required
                />
                <textarea
                  placeholder="Topic Content"
                  value={topic.content}
                  onChange={(e) =>
                    handleTopicChange(index, "content", e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={addTopic}>
            Add Topic
          </button>
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
