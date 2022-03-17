const { Course, Author } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class CourseController {
  async create(req, res, next) {
    try {
      let { name, price, authorInfo } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", fileName));
      const course = await Course.create({ name, price, img: fileName });
      if (authorInfo) {
        authorInfo = JSON.parse(authorInfo);
        authorInfo.forEach((i) =>
          Author.create({
            authorName: i.name,
            authotId: i.id,
          })
        );
      }

      return res.json(course);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { id } = req.query;
    let courses;
    courses = await Course.findAll();
    return res.json(courses);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const course = await Course.findOne({
      where: { id },
      include: [{ model: Author, as: "authorInfo" }],
    });
    return res.json(course);
  }
}

module.exports = new CourseController();
