const { Theory } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class TheoryController {
  async createTheory(req, res, next) {
    try {
      let { name, text, chapterNum, type } = req.body;

      const theory = await Theory.create({ name, text, chapterNum, type });

      return res.json(theory);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async createOpenPM(req, res, next) {
  //   try {
  //     let { name, text } = req.body;

  //     const course = await OpenMPTheory.create({ name, text });

  //     return res.json(course);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  async update(req, res, next) {
    try {
      let { name, text, chapterNum, type, id } = req.body;

      const theory = await Theory.findOne({ where: { id } });

      theory.update({ name, text, chapterNum, type });

      return res.json(theory);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async updateOpenMP(req, res, next) {
  //   try {
  //     let { name, text } = req.body;

  //     const theory = await OpenMPTheory.findOne({ where: { id } });

  //     theory.update({ name, text });

  //     return res.json(course);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      console.log(req.query);
      const theory = await Theory.destroy({ where: { id } });

      return res.json(theory);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async deleteOpenMP(req, res, next) {
  //   try {
  //     let { id } = req.params;
  //     console.log(req.query);
  //     const theory = await OpenMPTheory.destroy({ where: { id } });

  //     return res.json(theory);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  async getAll(req, res) {
    const { id } = req.query;
    let theory;
    theory = await Theory.findAll({ attributes: { exclude: ["text"] } });

    return res.json(theory);
  }

  // async getAllOpenMP(req, res) {
  //   const { id } = req.query;
  //   let openMP;

  //   openMP = await OpenMPTheory.findAll({ attributes: { exclude: ["text"] } });
  //   return res.json(openMP);
  // }

  async getOne(req, res) {
    const { id } = req.params;
    const theory = await Theory.findOne({
      where: { id },
    });
    return res.json(theory);
  }

  // async getOneOpenMP(req, res) {
  //   const { id } = req.params;
  //   const course = await OpenMPTheory.findOne({
  //     where: { id },
  //   });
  //   return res.json(course);
  // }
}

module.exports = new TheoryController();
