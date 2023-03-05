import express from "express";
import dotEnvConfig from "dotenv";
import todosRouter from "./src/routes/todos.route";
import timelineRouter from "./src/routes/timeline.route";
import usersRouter from "./src/routes/users.route";
import { logger } from "./src/middleware/logger";
import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { errorHandler } from "./src/middleware/error-handler";

dotEnvConfig.config();

initializeApp({
  credential: credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});


const app = express();

app.use(express.json());

const PORT = 3000;

app.use(logger);
app.use("/api/todos", todosRouter);
app.use("/api/timeline", timelineRouter);
app.use("/api/users", usersRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
