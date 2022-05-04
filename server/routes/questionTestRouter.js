const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();
const CourseController = require("../controllers/courseController");

router.post("/", checkRole("ADMIN"), CourseController.create);
router.get("/testId");

module.exports = router;
