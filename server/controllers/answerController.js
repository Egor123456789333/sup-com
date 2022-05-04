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

class AnswerController {
  async recive(req, res, next) {
    try {
      let { answer } = req.body;

      for (let i = 0; i < answer.length; i++) {
        const question = await QuestionTest.findOne({
          where: { id: answer[i][1] },
          include: { model: QuestionAnswer, where: { rigth: true } },
        });
        if (question.question_answers[0].id == answer[i][0]) {
          answer[i].push(true);
        } else {
          answer[i].push(question.question_answers[0].id);
        }
      }

      return res.json(answer);
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

module.exports = new AnswerController();
