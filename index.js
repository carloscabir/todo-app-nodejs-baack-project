import express, { json }  from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { TodoModel } from './models/mongodb/todos/todos.js'
import logger from "morgan"
import { createApiRouter } from './routes/api/api.v1.js'

export const createApp = ({ todoModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable("x-powered-by")
  app.use(logger("dev"))
  
  app.get("/", (req, res) => {
    res.json({
      api: "v1.0.0",
      message: "Please visit documentation or other endpoint"
    })
  })

  app.use("/api/v1", createApiRouter({ todoModel }))
  
  app.all("*", (req, res) => {
    return res.status(404).json({
      api: "v1.0.0",
      error: "404: Not found",
      message: "Please visit documentation or other endpoint"
    })
});

  const PORT = process.env.PORT || 3000
  
  app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
  })
 }

createApp({ todoModel: TodoModel })