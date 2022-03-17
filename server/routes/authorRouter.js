const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");

const authorController = require("../controllers/authorController");

router.post("/", checkRole("ADMIN"), authorController.create);
router.get("/", authorController.getAll);

router.get("/id");

module.exports = router;
