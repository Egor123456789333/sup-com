const Router = require("express");
const router = new Router();
const authorRouter = require("./authorRouter");
const basketRouter = require("./basketRouter");
const courseRouter = require("./courseRouter");
const userRouter = require("./userRouter");


router.use("/user", userRouter);
router.use("/course", courseRouter);
//router.use("/basket", basketRouter);
router.use("/author", authorRouter);

module.exports = router;
