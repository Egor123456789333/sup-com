const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();
const CourseController = require("../controllers/courseController");
const TheoryController = require("../controllers/theoryController");

router.post("/", TheoryController.createTheory);
//router.post("/openMP", TheoryController.createOpenPM);

router.get("/", TheoryController.getAll);
//router.get("/openMP", TheoryController.getAllOpenMP);

router.get("/:id", TheoryController.getOne);
//router.get("/openMP/:id", TheoryController.getOneOpenMP);

router.put("/", checkRole("ADMIN"), TheoryController.update);
//router.put("/openMP/", checkRole("ADMIN"), TheoryController.updateOpenMP);

router.delete("/:id", TheoryController.delete);
//router.delete("/openMP/:id", TheoryController.deleteOpenMP);

module.exports = router;
