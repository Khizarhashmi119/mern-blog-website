require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth-routes");
const blogRoutes = require("./routes/blog-routes");

const app = express();

const PORT = process.env.PORT;

//* Connect database.
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
    console.log("MongoDB is connected...");
  })
  .catch((err) => {
    console.error(err.message);
  });

//* Middlewares.
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "API is running..." });
});

//* API routes.
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
