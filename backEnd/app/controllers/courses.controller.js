const Course = require("../models/Courses");

function CourseList(cb) {
  Course.find()
    .lean()
    .exec(function (err, Courses) {
      if (err) {
        cb(err);
      } else {
        cb(null, Courses);
      }
    });
}

function CourseAdd(data, cb) {
  let newCourse = new Course(data);

  newCourse.save(function (err, Course) {
    if (err) {
      cb(err);
    } else {
      cb(null, Course);
    }
  });
}

function CourseDelete(id, cb) {
  Course.deleteOne({ _id: id }, function (err, Course) {
    if (err) {
      cb(err);
    } else {
      cb(null, Course);
    }
  });
}

module.exports = {
  list: CourseList,
  add: CourseAdd,
  delete: CourseDelete,
};
