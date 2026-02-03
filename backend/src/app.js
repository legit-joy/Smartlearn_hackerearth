import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApiError } from './utils/ApiError.js';

const app = express();

// Global Request Logger
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow any localhost/127.0.0.1 origin
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    return callback(null, origin === process.env.CORS_ORIGIN);
  },
  credentials: true
}));


app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js';

//routes declaration
app.use('/api/v1/users', userRouter);

// 404
app.use((req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  // Log the full error for debugging
  console.error("Global Error Handler detected error:", err);

  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";
  const errors = err?.errors || [];

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors
  });
});

export default app;