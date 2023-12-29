import { Router } from 'express'
import { TodoController } from '../../controllers/todos/todos.js'

export const createTodosRouter = ({ todoModel }) => {
  const todosRouter = Router();

  const todosController = new TodoController({ todoModel });

  todosRouter.get("/", todosController.getAll)

  todosRouter.post("/", todosController.create)
  
  todosRouter.patch("/:id", todosController.updateById)
  
  todosRouter.delete("/:id", todosController.deleteById)

  return todosRouter
 }