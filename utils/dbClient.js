import mongoose from "mongoose"
import dotenv from "dotenv/config"

export const dbClient = async () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(m => { 
      console.log(`Conected to ${m.connection.name} database`)
      return m.connection.getClient()
    })
    .catch(err => console.log(err))
}