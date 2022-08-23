const {
  Test,
  Course,
  Author,
  QuestionTest,
  QuestionAnswer,
  ResultsTest,
  OnelineAnswer,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class AnswerController {
  async recive(req, res, next) {
    try {
      let { answer } = req.body;

      let counter = 0;
      for (let i = 0; i < answer.answer.length; i++) {
        if (answer.answer[i][2] == "oneline") {
          const question = await OnelineAnswer.findOne({
            where: { questionTestId: answer.answer[i][1] },
          });
          console.log("XNJXNJ   ", question);
          if (question.dataValues.answerText == answer.answer[i][0]) {
            answer.answer[i].push(true);
            counter++;
          } else {
            answer.answer[i].push(false);
            answer.answer[i].push(question.dataValues.answerText);
          }
        } else if (answer.answer[i][2] == "oneAnswer") {
          const question = await QuestionTest.findOne({
            where: { id: answer.answer[i][1] },
            include: { model: QuestionAnswer, where: { rigth: true } },
          });
          if (question.question_answers[0].id == answer.answer[i][0]) {
            answer.answer[i].push(true);
            counter++;
          } else {
            answer.answer[i].push(question.question_answers[0].id);
          }
        }
      }
      if (answer.user._isAuth) {
        let rigthAnswers = counter / answer.answer.length;
        const oldRes = await ResultsTest.destroy({
          where: { userId: answer.user._user.id, testId: answer.courseId },
        });
        ResultsTest.create({
          userId: answer.user._user.id,
          testId: answer.courseId,
          rigthAnswers,
        });
      } else {
        console.log("неа");
      }
      return res.json(answer.answer);
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
            {
              model: OnelineAnswer,
              attributes: { exclude: ["answerText"] },
            },
          ],
        },
      ],
    });
    return res.json(test);
  }
}

module.exports = new AnswerController();
