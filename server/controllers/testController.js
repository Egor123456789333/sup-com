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

class TestController {
  async create(req, res, next) {
    try {
      let { chapter, chapterName, questionTests, theoryType } = req.body;

      const test = await Test.create({ chapter, chapterName, theoryType });

      for (let i = 0; i < questionTests.length; i++) {
        const question = await QuestionTest.create({
          questionText: questionTests[i].questionText,
          testId: test.id,
          type: questionTests[i].type,
          typeRu: questionTests[i].typeRu,
          position: questionTests[i].position,
        });
        for (let j = 0; j < questionTests[i].questionAnswers.length; j++) {
          if (questionTests[i].type == "oneline") {
            const answers = await OnelineAnswer.create({
              questionTestId: question.id,
              text: questionTests[i].questionAnswers[j].text,
              answerText: questionTests[i].questionAnswers[j].answerText,
            });
          } else if (questionTests[i].type == "oneAnswer") {
            const answers = await QuestionAnswer.create({
              questionTestId: question.id,
              text: questionTests[i].questionAnswers[j].text,
              rigth: questionTests[i].questionAnswers[j].rigth,
            });
          }
        }
      }

      return res.json(test);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      let {
        chapter,
        chapterName,
        question_tests,
        id,
        deleteAnswer,
        deleteQuestion,
        theoryType,
      } = req.body;
      console.log(req.body);
      const test = await Test.findOne({ where: { id } });

      test.update({ chapter, chapterName, theoryType });

      for (let i = 0; i < question_tests.length; i++) {
        let question;
        console.log(question_tests[i].id);
        if (
          typeof question_tests[i].id == "undefined" ||
          question_tests[i].id == 0
        ) {
          question = await QuestionTest.create({
            questionText: question_tests[i].questionText,
            testId: id,
            position: question_tests[i].position,
            type: question_tests[i].type,
            typeRu: question_tests[i].typeRu,
          });
        } else {
          question = await QuestionTest.findOne({
            where: { id: question_tests[i].id },
          });
          question.update({
            questionText: question_tests[i].questionText,
            position: question_tests[i].position,
          });
        }

        for (let j = 0; j < question_tests[i].question_answers.length; j++) {
          if (question_tests[i].type == "oneAnswer") {
            if (
              typeof question_tests[i].question_answers[j].id == "undefined" ||
              question_tests[i].question_answers[j].id == 0
            ) {
              const answers = await QuestionAnswer.create({
                questionTestId: question.id,
                text: question_tests[i].question_answers[j].text,
                rigth: question_tests[i].question_answers[j].rigth,
              });
            } else {
              //console(question_tests[i].question_answers[j]);
              const answers = await QuestionAnswer.findOne({
                where: { id: question_tests[i].question_answers[j].id },
              });
              answers.update({
                text: question_tests[i].question_answers[j].text,
                rigth: question_tests[i].question_answers[j].rigth,
              });
            }
          } else if (question_tests[i].type == "oneline") {
            //console.log("109  ", question_tests[i]);
            if (
              typeof question_tests[i].one_lines[0].id == "undefined" ||
              question_tests[i].one_lines[0].id == 0
            ) {
              console.log("93  ", question_tests[i].one_lines[0].answerText);
              console.log("94  ", question.id);
              const answers = await OnelineAnswer.create({
                questionTestId: question.id,
                answerText: question_tests[i].one_lines[0].answerText,
              });
            } else {
              console.log("107   ", question_tests[i].one_lines[0]);
              const answers = await OnelineAnswer.findOne({
                where: { id: question_tests[i].one_lines[0].id },
              });
              answers.update({
                answerText: question_tests[i].one_lines[0].answerText,
              });
            }
          }
        }
      }

      for (let i = 0; i < deleteAnswer.length; i++) {
        //console("ЫЫыЫ", deleteAnswer[i]);
        await QuestionAnswer.destroy({
          where: { id: deleteAnswer[i] },
        });
      }

      for (let i = 0; i < deleteQuestion.length; i++) {
        //console("ЫЫFFFFFыЫ", deleteQuestion[i]);
        await QuestionTest.destroy({
          where: { id: deleteQuestion[i] },
        });
      }

      return res.json(test);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      //console(req.query);
      const test = await Test.destroy({ where: { id } });

      return res.json(test);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { id } = req.params;
      const { userId } = req.params;
      console.log("174", id);
      let tests;
      let results;
      let userResults;
      tests = await Test.findAll();
      //console.log(tests);
      results = await ResultsTest.findAll();
      if (id != "0") {
        userResults = results.filter((res) => res.userId == id);

        return res.json({ tests, userResults });
      }

      return res.json(tests);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
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

  async getOneWithAnswer(req, res) {
    const { id } = req.params;
    const test = await Test.findOne({
      where: { id },
      include: [
        {
          model: QuestionTest,
          include: [
            {
              model: QuestionAnswer,
            },
            {
              model: OnelineAnswer,
            },
          ],
        },
      ],
    });
    return res.json(test);
  }
}

module.exports = new TestController();
