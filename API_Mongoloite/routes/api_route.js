const express = require("express");
const postcontroller = require("../controller/post_controller");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("running node api");
});

router.post("/add-post", postcontroller.addPost);
router.get("/posts", postcontroller.showPost);
router.get("/post/:id", postcontroller.singlePost);
router.patch("/post-update", postcontroller.updatePost);
router.delete("/remove-post/:id", postcontroller.deletePost);

module.exports = router;
