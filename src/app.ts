const express = require("express");
const cors = require("cors");
const app = express();
const Users = require("./models/Users.model");
const allowedOrigins = ["http://ip1"]; // substitua pelos IPs permitidos

const whitelist = ["http://129.122.213.230", "http://192.168.1.163"];
const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(express.json());
app.use(cors(corsOptions));

app.use("/", (req: any, res: any) => {
  return res.status(200).json("ola Ruben André");
});
////////////////////////////////////////////
app.post("/createuser", async (req: any, res: any) => {
  if (req.body.email && req.body.password && req.body.name) {
    const user = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    };
    await Users.save(user);
    return res.status(200).json("criado");
  } else {
    return res.status(200).json("erro");
  }
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
