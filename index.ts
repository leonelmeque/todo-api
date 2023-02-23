import express from "express";

import todosRouter from "./src/routes/todos.route";
import timelineRouter from "./src/routes/timeline.route";
import usersRouter from "./src/routes/users.route";
import { logger } from "./src/middleware/logger";

const app = express();

app.use(express.json());

const PORT = 3000;

app.use(logger);
app.use("/api/todos", todosRouter);
app.use("/api/timeline", timelineRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
