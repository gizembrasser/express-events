import express from "express";

const app = express();

Sentry.init({
  dsn: "https://0910b1f46936c8c67e2f44695f693b7d@o4506263121821696.ingest.sentry.io/4506264763170816",
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

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
