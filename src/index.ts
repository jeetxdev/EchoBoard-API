import { Server } from "http";
import app from "@/app";
import connectDB from "@/lib/db";

const port = process.env.PORT || 5000;
let server: Server | null;
connectDB()
  .then(() => {
    console.log("database connected");
    server = app.listen(port, () => {
      console.log("server is running");
    });
  })
  .catch((error) => {
    console.log("DB connection failed");
    shutDown();
  });

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  console.log("Shutting down gracefully");
  if (server) {
    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });
  }

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
}
