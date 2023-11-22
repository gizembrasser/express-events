import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
const app = express();

Sentry.init({
  dsn: "https://198ea68330b5bffad9f239f9029d29e4@o4506263121821696.ingest.sentry.io/4506263133749248",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
