import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended: true, limit:'20kb'}))
app.use(cors())

import userRouter from "./routes/user.routes.js"
// for routing
app.use("/api/v1/users",userRouter)

//for err handling 
app.use((err, req, res, next) => {
    res.status(400).json({ error: 'Internal Server Error' });
  });

export default app
