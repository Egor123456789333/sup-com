const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();
const TestController = require("../controllers/testController");
const AnswerController = require("../controllers/answerController");

router.post("/", checkRole("ADMIN"), TestController.create);
router.get("/", TestController.getAll);
router.get("/:id", TestController.getOne);
router.post("/complete", AnswerController.recive);

module.exports = router;
