import express, { type Request, type Response } from "express";
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   res.send("Hello World");
  res.status(200).json({
    success: "true",
    message: "This is a root router",
    author: "PH",
  });
});

app.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server in running prot, ${port}`);
});
