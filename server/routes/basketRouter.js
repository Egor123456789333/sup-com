const Router = require("express");

const router = new Router();
const BasketController = require("../controllers/basketController");

router.post("/", BasketController.create);
router.get("/:id", BasketController.getAll);
// router.get("/id");
// router.put("/", BasketController.update);
// router.put("/withoutImage", BasketController.updateWithoutImage);
router.delete("/:id", BasketController.delete);

module.exports = router;
