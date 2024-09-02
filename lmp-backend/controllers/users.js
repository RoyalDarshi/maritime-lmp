const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const decodeToken=(token)=>{
  return jwt.decode(token);
}

exports.registerUser = async (req, res) => {
  try {
    const userBody = req.body;
    const oldUser = await User.findOne({ email: userBody.email });
    if (oldUser) {
      return res.status(400).json({ err: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    userBody.password = await bcrypt.hash(userBody.password, salt);
    const user = new User(userBody);
    await user.save();
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ msg: "User registered successfully", token, role: user.role });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ err: "something went wrong while registering user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const userBody = req.body;
    const user = await User.findOne({ email: userBody.email });
    if (!user) {
      return res.status(400).json({ err: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(userBody.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: "wrong password!!" });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ msg: "user logged in successfully", token, user: user });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ err: "something went wrong while registering user" });
  }
};

exports.enrollUser = async (req, res) => {
  const { courseId } = req.body;
  try {
    const user = await User.findById(decodeToken(req.params.id).id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const alreadyEnrolled = user.courses.some((course) =>
      course.courseId.equals(courseId)
    );
    if (alreadyEnrolled) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this course" });
    }
    user.courses.push({
      courseId: courseId,
      progress: 0,
      completedTopics: [],
    });

    await user.save();

    res
      .status(200)
      .json({ message: "User successfully enrolled in the course" });
  } catch (error) {
    res.status(500).json({ error: "Failed to enroll user in the course" });
  }
};


exports.userProgress = async (req, res) => {
  try {        
    const user = await User.findById(decodeToken(req.params.id).id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user progress" });
  }
};

exports.startTopic = async (req, res) => {
  const { courseId, topicId } = req.body;
  try {
    const user = await User.findById(decodeToken(req.params.id).id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const courseProgress = user.courses.find((c) =>
      c.courseId.equals(courseId)
    );

    if (!courseProgress) {
      return res
        .status(400)
        .json({ error: "User is not enrolled in this course" });
    }

    const course = await Course.findById(courseId);
    const topicIndex = course.topics.findIndex((t) => t._id.equals(topicId));

    if (topicIndex === -1) {
      return res.status(400).json({ error: "Topic not found" });
    }

    if (
      course.topics[topicIndex - 1] &&
      !courseProgress.completedTopics.includes(
        course.topics[topicIndex - 1]._id
      )
    ) {
      return res.status(400).json({ error: "Previous topic not completed" });
    }

    courseProgress.completedTopics.push(topicId);
    courseProgress.progress =
      (courseProgress.completedTopics.length / course.topics.length) * 100;

    await user.save();

    res.json({ progress: courseProgress.progress });
  } catch (error) {
    res.status(500).json({ error: "Failed to update topic progress" });
  }
};
