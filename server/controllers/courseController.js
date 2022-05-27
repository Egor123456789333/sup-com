const { Course, Author } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class CourseController {
  async create(req, res, next) {
    try {
      let { name, price, authorInfo } = req.body;
      console.log(req.files);
      const { img } = req.files;

      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const course = await Course.create({ name, price, img: fileName });
      // if (authorInfo) {
      //   authorInfo = JSON.parse(authorInfo);
      //   authorInfo.forEach((i) =>
      //     Author.create({
      //       authorName: i.name,
      //       authotId: i.id,
      //     })
      //   );
      // }

      return res.json(course);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      let { name, price, authorInfo, id } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const course = await Course.findOne({ where: { id } });

      course.update({ name, price, img: fileName });
      //const course = await Course.update({ name, price, img: fileName });
      // if (authorInfo) {
      //   authorInfo = JSON.parse(authorInfo);
      //   authorInfo.forEach((i) =>
      //     Author.create({
      //       authorName: i.name,
      //       authotId: i.id,
      //     })
      //   );
      // }

      return res.json(course);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateWithoutImage(req, res, next) {
    try {
      let { name, price, authorInfo, id, imgPath } = req.body;

      let fileName = imgPath;

      const course = await Course.findOne({ where: { id } });

      course.update({ name, price, img: fileName });
      //const course = await Course.update({ name, price, img: fileName });
      // if (authorInfo) {
      //   authorInfo = JSON.parse(authorInfo);
      //   authorInfo.forEach((i) =>
      //     Author.create({
      //       authorName: i.name,
      //       authotId: i.id,
      //     })
      //   );
      // }

      return res.json(course);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      console.log(req.query);
      const test = await Course.destroy({ where: { id } });

      return res.json(test);
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
