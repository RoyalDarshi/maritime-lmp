const express = require("express");
const router = express.Router();
const course=require("../controllers/courses")

router.get("/courses",course.getAllCourses)

router.get("/courses/:id", course.getOneCourse);

router.post('/',course.createCourse);

module.exports=router;