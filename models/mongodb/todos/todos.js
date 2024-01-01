import mongoose from "mongoose"
import { dbClient } from "../../../utils/dbClient.js"
import { TODO_SCHEMA } from "../../../schemas/mongodb/todos/todo.js"
import { IS_NOT_SUCCESSFUL, IS_SUCCESSFUL, TODOS_ERRORS, TODOS_SUCCESS_MESSAGES } from "../../../consts/todos.js"

dbClient()

const MongoTodoModel = mongoose.model("Todo", TODO_SCHEMA)

export class TodoModel {
  static async getAll() {
    try {
      const todos = await MongoTodoModel.find()
      
      return {
        ok: IS_SUCCESSFUL,
        message: TODOS_SUCCESS_MESSAGES.SUCCESS_GET_ALL,
        response: todos,
      }
    } catch (err) {
      console.log(err)
      return {
        ok: IS_NOT_SUCCESSFUL,
        message: TODOS_ERRORS.ERR_GET_ALL,
        response: null,
      }
    }
  }

  static async create({ input }) {
    try {
      const todo = await MongoTodoModel.create(input)
      
      return {
        ok: IS_SUCCESSFUL,
        message: TODOS_SUCCESS_MESSAGES.SUCCESS_CREATE_TODO,
        response: todo,
      }
    } catch (err) {
       console.log(err)
        return {
          response: null,
          message: TODOS_ERRORS.ERR_CREATE_TODO,
          ok: IS_NOT_SUCCESSFUL,
        }
    }
   }

  static async updateById({ id, input }) { 
    try {
      const res = await MongoTodoModel.findByIdAndUpdate(id, {
        $set: input
      },
      {
        new: true
        })
      
      return {
        ok: IS_SUCCESSFUL,
        message: TODOS_SUCCESS_MESSAGES.SUCCESS_UPDATE_TODO,
        response: {
          updatedDocument: res
        }
      }
    } catch (err) {
      return {
        ok: IS_NOT_SUCCESSFUL,
        message: TODOS_ERRORS.ERR_UPDATE_TODO,
        response: null
      }
    }
  }
  
  static async deleteById({ id }) {
    try {
      const todo = await MongoTodoModel.findByIdAndDelete(id)

      return {
        ok: IS_SUCCESSFUL,
        message: TODOS_SUCCESS_MESSAGES.SUCCESS_DELETE_TODO,
        response: {
          deletedTodo: todo
        } ,
      }
    } catch (err) {
      return {
        ok: IS_NOT_SUCCESSFUL,
        message: TODOS_ERRORS.ERR_DELETE_TODO,
        response: null,
      }
    }
  }
  
  static async deleteAllCompleted() {
    try {
      const allCompletedTodos = await MongoTodoModel.deleteMany({ completed: true })
      console.log(allCompletedTodos)
      
      return {
        ok: IS_SUCCESSFUL,
        message: TODOS_SUCCESS_MESSAGES.SUCCESS_DELETE_ALL_COMPLETED,
        response: allCompletedTodos
      }
    } catch (err) {
      console.log(err)
      return {
        ok: IS_NOT_SUCCESSFUL,
        message: TODOS_ERRORS.ERR_DELETE_ALL_COMPLETED,
        response: null
      }
    }
   }
}