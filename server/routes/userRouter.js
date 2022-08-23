const Router = require("express");
const userController = require("../controllers/userController");
const authMeddleware = require("../middleware/authMeddleware");
const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMeddleware, userController.check);
router.put("/name", userController.changeName);
router.put("/surname", userController.changeSurname);

module.exports = router;
