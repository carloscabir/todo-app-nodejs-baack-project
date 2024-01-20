import cors from "cors"

export const ACCEPTED_ORIGINS = [
  process.env.ACCEPTED_CLIENT_ORIGIN,
  "http://localhost:3000",
  "http://localhost:5500",
  "http://localhost:5173",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) { 
      return callback(null, true)
    }
    
    return callback(new Error("Not allowed by CORS"))
}
})