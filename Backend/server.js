require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { MONGODBURL, PORT } = require("./config");

const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


const { adminRouter } = require("./routes/admin");
const { counsellorRouter } = require("./routes/counsellor");
const { studentRouter } = require("./routes/student");
const { userRouter } = require("./routes/auth");



app.use("/auth", userRouter);
app.use("/student", studentRouter);
app.use("/counsellor", counsellorRouter);
app.use("/admin", adminRouter);

async function main() {
  await mongoose.connect(MONGODBURL);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

main();
