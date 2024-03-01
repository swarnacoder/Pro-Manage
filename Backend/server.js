require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/auth-Routes");
const todoRouter = require("./routes/todo-Routes");
const connectDb = require("./utils/database");
const errorMiddleware = require("./middlewares/error-Middleware");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "POST, GET, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/v1", todoRouter);

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});
