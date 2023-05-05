const express = require("express");
const cors = require("cors");
//const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", (req: any, res: any) => {
  return res.status(200).json("ola Ruben André");
});

app.use((error: any, req: any, res: any) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

export default app;
