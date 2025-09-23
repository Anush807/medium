import { Hono } from "hono";
import { userRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";

// import { hash, compare } from "bcryptjs"

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;

}
const app = new Hono<{ Bindings: Env }>();

app.route("/api/v1/users", userRouter);
app.route("api/v1/blogs", blogRouter);

export default app;