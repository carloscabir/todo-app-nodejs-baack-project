import { Router } from "express"
import { createTodosRouter } from "../todos/todos.js"

export const createApiRouter = ({ todoModel }) => { 
  const apiRouter = Router()

  apiRouter.get("/", (req, res) => {
    return res.json({
      api: "v1.0.0",
      message: "Please visit documentation or other endpoint"
    })
  })
 
  apiRouter.use("/todos", createTodosRouter({ todoModel }))

  return apiRouter
}