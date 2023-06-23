import prisma from "../lib/prismadb";

export default async function getBlogs() {
  try {
    const blogs = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeBlogs = blogs.map((blog) => ({
      ...blog,
      createdAt: blog.createdAt.toISOString(),
    }));
    return safeBlogs;
  } catch (err) {
    return null;
  }
}
