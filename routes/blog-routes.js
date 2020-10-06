const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const {
  getBlogs,
  getBlog,
  addBlog,
  deleteBlog,
  updateBlog,
  isSignin,
} = require("../controllers/blog-controllers");

//* @route  GET /api/blogs
//* @desc   Get blogs route.
//* @access public
router.get("/", getBlogs);

//* @route  GET /api/blogs/:blogId
//* @desc   Get blog route.
//* @access public
router.get("/:blogId", getBlog);

//* @route  POST /api/blogs
//* @desc   Add blog route.
//* @access private
router.post(
  "/",
  [
    isSignin,
    [
      body("title", "Title is required.").notEmpty(),
      body("body", "Body is required.").notEmpty(),
    ],
  ],
  addBlog
);

//* @route  Blog /api/blogs/:blogId
//* @desc   Delete blog route.
//* @access private
router.delete("/:blogId", isSignin, deleteBlog);

//* @route  Put /api/blogs/:blogId
//* @desc   Update blog route.
//* @access private
router.put(
  "/:blogId",
  [
    isSignin,
    [
      body("title", "Title is required.").notEmpty(),
      body("body", "Body is required.").notEmpty(),
    ],
  ],
  updateBlog
);

module.exports = router;
