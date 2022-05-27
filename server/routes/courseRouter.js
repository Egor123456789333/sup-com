const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();
const CourseController = require("../controllers/courseController");

router.post("/", checkRole("ADMIN"), CourseController.create);
router.get("/", CourseController.getAll);
router.get("/id");
router.put("/", CourseController.update);
router.put("/withoutImage", CourseController.updateWithoutImage);
router.delete("/:id", CourseController.delete);

module.exports = router;
