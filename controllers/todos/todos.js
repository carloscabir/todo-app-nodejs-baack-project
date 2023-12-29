import { validatePartialTodo, validateTodo } from "../../schemas/zod/todos/todo.js"

export class TodoController { 
  constructor({ todoModel }) { 
    this.todoModel = todoModel
  }

  getAll = async (req, res) => { 
    const todos = await this.todoModel.getAll()
    if (!todos.ok) return res.status(404).json(todos)
    
    return res.status(200).json(todos)
  }

  create = async (req, res) => {
    const result = validateTodo(req.body)

    if (result.error) return res.status(400).json(result)

    const todo = await this.todoModel.create({ input: result.data })
      
    if (!todo.ok) return res.status(400).json(todo)
  
    return res.status(201).json(todo)
   }
  
  updateById = async (req, res) => {
    // const { id, toggleCompleted } = req.params
    // Two ways to solve the toggleCompleted problem
    // Toggle completed with database data
    // or
    // Toggle completed with input data
    // => For this case I'll use the input data
    const { id } = req.params

    const result = validatePartialTodo(req.body)
    
    if (result.error) return res.status(400).json(result)
    
    const todo = await this.todoModel.updateById({ id, input: result.data})
    
    if (!todo.ok) return res.status(404).json(todo)
    
    return res.status(200).json(todo)
  }
  
  deleteById = async (req, res) => {
    const { id } = req.params

    const response = await this.todoModel.deleteById({ id })

    if (!response.ok) return res.status(404).json(response)

    return res.status(200).json(response)
   }
}