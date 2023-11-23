import express from "express";
import eventsRouter from "./routes/events.js";
import usersRouter from "./routes/users.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler.js";
import * as Sentry from "@sentry/node";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(log);

app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
