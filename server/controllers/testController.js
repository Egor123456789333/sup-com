const {
  Test,
  Course,
  Author,
  QuestionTest,
  QuestionAnswer,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class TestController {
  async create(req, res, next) {
    try {
      let { chapter, chapterName, questionTests } = req.body;

      const test = await Test.create({ chapter, chapterName });

      for (let i = 0; i < questionTests.length; i++) {
        const question = await QuestionTest.create({
          questionText: questionTests[i].questionText,
          testId: test.id,
        });
        for (let j = 0; j < questionTests[i].questionAnswers.length; j++) {
          const answers = await QuestionAnswer.create({
            questionTestId: question.id,
            text: questionTests[i].questionAnswers[j].text,
            rigth: questionTests[i].questionAnswers[j].rigth,
          });
        }
      }

      return res.json(test);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { id } = req.query;
    let courses;
    courses = await Test.findAll();
    return res.json(courses);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const test = await Test.findOne({
      where: { id },
      include: [
        {
          model: QuestionTest,
          include: [
            {
              model: QuestionAnswer,
              attributes: { exclude: ["rigth"] },
            },
          ],
        },
      ],
    });
    return res.json(test);
  }
}

module.exports = new TestController();
