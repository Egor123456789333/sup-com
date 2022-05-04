const Router = require("express");
const router = new Router();
const authorRouter = require("./authorRouter");
const basketRouter = require("./basketRouter");
const courseRouter = require("./courseRouter");
const userRouter = require("./userRouter");
const testRouter = require("./testRouter");

router.use("/user", userRouter);
router.use("/course", courseRouter);
//router.use("/basket", basketRouter);
router.use("/author", authorRouter);
router.use("/test", testRouter);

module.exports = router;
