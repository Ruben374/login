const express = require("express");
const cors = require("cors");
const app = express();
const Users = require("./models/Users.model");
const whiteList = [
    'http://localhost:9700',
    'http://0.0.0.0:9700',
    'http://192.168.1.163',
    'https://inscricao.ipilmakarenko.ao',
    'https://www.inscricao.ipilmakarenko.ao'
]

const corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1)
            callback(null, true)
        else            
            callback('403')
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Credential: true
}

//app.use(cors(corsOption)); //disabled cors options
app.use(express.json());
//app.use(cors(corsOption));

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
