const {
  Test,
  Course,
  Author,
  QuestionTest,
  QuestionAnswer,
  ResultsTest,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class ResultsController {
  async getAll(req, res) {
    const {} = req.body;
    let results;
    results = await ResultsTest.findAll();
    console.log(res.json(results));
    return res.json(results);
  }
}

module.exports = new ResultsController();
