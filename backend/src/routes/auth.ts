import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt';
import { signupInput } from "@anush_codes/medium-comman";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "wrong input formats"
      })
    }

    console.log("Creating Prisma client with edge bundle...");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    console.log("Attempting to create user...");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    });
    console.log("User created successfully:", user.id);

    const secret = c.env.JWT_SECRET;
    const token = await sign({ id: user.id }, secret);

    return c.json({
      token: token,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error("Signup error:", err);
    return c.json({
      error: "Failed to create user",
      details: err instanceof Error ? err.message : String(err)
    }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!user) {
      return c.json({
        message: "User not found"
      }, 404);
    }

    const userPassword = user.password;

    if (body.password != userPassword) {
      return c.json({
        error: "Wrong password"
      })
    }
    const token = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.json({
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error("Signin error:", err);
    return c.json({
      error: "Failed to sign in",
      details: err instanceof Error ? err.message : String(err)
    }, 500);
  }
});
