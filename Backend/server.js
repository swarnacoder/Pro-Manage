require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const router = require("./routes/auth-Routes")
const connectDb = require("./utils/database")
const errorMiddleware = require("./middlewares/error-Middleware")

app.use(express.json());



app.use("/api/auth", router);

app.use(errorMiddleware);

connectDb()
.then(() => {
  app.listen(process.env.PORT, () => {
    
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});
