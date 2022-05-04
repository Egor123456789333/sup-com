const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();

const answerController = require("../controllers/answerController");

router.post("/", answerController.recive);
router.get("/questionId");

module.exports = router;
