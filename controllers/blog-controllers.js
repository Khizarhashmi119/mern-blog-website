const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("userId", [
      "firstName",
      "name",
      "lastName",
    ]);

    if (blogs.length === 0) {
      return res.status(404).json({ errors: [{ msg: "No posts found." }] });
    }

    return res.status(200).json(blogs);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

const getBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).populate("userId", [
      "firstName",
      "name",
      "lastName",
    ]);

    if (!blog) {
      return res.status(404).json({ errors: [{ msg: "No blog found." }] });
    }

    return res.status(200).json(blog);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

const addBlog = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { id } = req.user;
  const { title, body } = req.body;

  try {
    //* Create new post.
    const newBlog = new Blog({
      userId: id,
      title,
      body,
    });

    //* Save post to database.
    await newBlog.save();
    return res
      .status(200)
      .json({ messages: [{ msg: "Blog has been successfully saved." }] });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  const { id: userId } = req.user;

  try {
    //* Delete post.
    const blog = await Blog.findById(blogId);

    if (blog.userId.toString() !== userId) {
      return res
        .status(200)
        .json({ errors: [{ msg: "User not authorised." }] });
    }

    await blog.remove();

    return res
      .status(200)
      .json({ messages: [{ msg: "Blog has been deleted." }] });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

const updateBlog = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { blogId } = req.params;
  const { id: userId } = req.user;

  const { title, body } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (blog.userId.toString() !== userId) {
      return res
        .status(200)
        .json({ errors: [{ msg: "User not authorised." }] });
    }

    await blog.update({ title, body });
    return res
      .status(200)
      .json({ messages: [{ msg: "Blog has been updated." }] });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//* Middlewares

const isSignin = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ errors: "No token found! Access denied." });
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedPayload.user;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: err.message });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  addBlog,
  deleteBlog,
  updateBlog,
  isSignin,
};
