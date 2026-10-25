import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleChat } from "./netlify/functions/_shared/chat-handler.mjs";

function chatApiPlugin() {
  return {
    name: "local-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res, next) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          next();
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          res.setHeader("Content-Type", "application/json");
          try {
            const parsed = JSON.parse(body || "{}");
            const env = loadEnv(server.config.mode, process.cwd(), "");
            const result = await handleChat({
              messages: parsed.messages,
              apiKey: env.GEMINI_API_KEY || process.env.GEMINI_API_KEY,
            });
            res.statusCode = 200;
            res.end(JSON.stringify(result));
          } catch (error) {
            res.statusCode = error.statusCode || 500;
            res.end(
              JSON.stringify({
                error: error.message || "Something went wrong",
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), chatApiPlugin()],
});
