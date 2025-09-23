import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlog, updateBlog } from "@anush_codes/medium-comman";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
}>()

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    const actualHeader = authHeader.split(" ")[1];
    const user = await verify(actualHeader, c.env.JWT_SECRET)
    if (user) {
        c.set("userId", (user as { id: string }).id);
        await next();
    }
    else {
        c.status(403)
        return c.json({
            message: "User not logged in"
        })
    }
})

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body);
    if (!success) {
        return c.json({
            message: "Wrong input format"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: (await blog).id
    })
});

blogRouter.put("/blog", async (c) => {
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "wrong input format"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: blog.id,
        title: blog.title
    })
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany();

    return c.json({
        blogs
    })
});

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    if (!id) {
        return
    }
    const blog = await prisma.post.findFirst({
        where: {
            id: id
        }
    })
    return c.json({
        blog
    })
});
