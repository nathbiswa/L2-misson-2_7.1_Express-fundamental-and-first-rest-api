import express, { type Request, type Response } from "express";
import { Pool } from "pg";
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_9sHnTj8ZzrER@ep-lively-thunder-a1g93fgq-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
});

// console.log(pool);

const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        `);
    console.log("Data base is connected !!");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get("/", (req, res) => {
  //   res.send("Hello World");
  res.status(200).json({
    success: "true",
    message: "This is a root router",
    author: "PH",
  });
});

app.post("/", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, age, password } = req.body;
  console.log(password);
  res.status(200).json({
    success: "true",
    message: "This is test post api",
    data: { name, age },
  });
});

app.listen(port, () => {
  console.log(`Server in running prot, ${port}`);
});
