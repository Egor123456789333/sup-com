const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();
const TestController = require("../controllers/testController");
const AnswerController = require("../controllers/answerController");
const { Test } = require("../models/models");
const ResultsController = require("../controllers/resultController");

router.post("/", checkRole("ADMIN"), TestController.create);
router.get("/all/:id", TestController.getAll);
router.get("/:id", TestController.getOne);
router.post("/complete", AnswerController.recive);
router.delete("/:id", checkRole("ADMIN"), TestController.delete);
router.put("/", checkRole("ADMIN"), TestController.update);
router.get("/withAnswer/:id", TestController.getOneWithAnswer);
router.get("/result", ResultsController.getAll);

module.exports = router;
