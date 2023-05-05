import http from "http";
import app from "./app";
import mongoose from "mongoose";
//mongoose.set("strictQuery", false);
/////////////////////////////////////////////////////////////
const server = http.createServer(app);
mongoose
  .connect(
    `mongodb+srv://rb:AlGBo2cIPJeQaxGT@cluster0.qg7ts.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(3000, () => {
      console.log("App listen in: ", 3000);
    });
    console.log("Connected to the database successfully!");
  })
  .catch((err) => console.log(err));
