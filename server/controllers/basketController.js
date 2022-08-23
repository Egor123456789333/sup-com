const { Basket, BasketCourse, Course, Author } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class BasketController {
  async create(req, res, next) {
    try {
      let { courseId, userId } = req.body;

      const basket = await Basket.findOne({ where: { userId } });
      console.log(basket);
      const basketCourse = await BasketCourse.create({
        basketId: basket.id,
        courseId,
        userId,
      });

      return res.json(basketCourse);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      console.log(req.query);
      const course = await BasketCourse.destroy({ where: { id } });

      return res.json(course);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.params;
      console.log("39", id);
      let courses;
      let userCourses;
      let basket = await Basket.findOne({
        where: { userId: id },
        include: [
          {
            model: BasketCourse,
            include: [
              {
                model: Course,
              },
            ],
          },
        ],
      });
      console.log("44", basket);
      // courses = await BasketCourse.findAll();
      // userCourses = courses.filter((course) => course.userId == id);
      // let allCourser = await Course.findAll();
      // userCourses.map;
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
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

module.exports = new BasketController();
