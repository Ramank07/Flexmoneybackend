import 'dotenv/config';
import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "./controllers/errorController.js";
import userRouter from "./routes/userRouter.js";
const app = express()

app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||3000;

app.use("/api/user",userRouter);
app.use(errorHandler);


async function connectdb() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
    });
    console.log(`dataBase connected`);
  } catch (error) {
    console.log(error);
  }
}
connectdb();


app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    
})
