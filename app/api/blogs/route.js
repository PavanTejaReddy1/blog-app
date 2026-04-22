export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const id = searchParams.get("id");

    // ✅ If single blog requested
    if (id) {
      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`
      );

      const data = await res.json();

      return Response.json({ blog: data.blog || null });
    }

    // ✅ Otherwise fetch list
    const res1 = await fetch(
      `https://api.slingacademy.com/v1/sample-data/blog-posts?page=${page}`
    );

    const res2 = await fetch(
      `https://api.slingacademy.com/v1/sample-data/blog-posts?page=${page + 1}`
    );

    const data1 = await res1.json();
    const data2 = await res2.json();

    const blogs = [
      ...(data1.blogs || []),
      ...(data2.blogs || [])
    ].slice(0, 12);

    return Response.json({ blogs });

  } catch (error) {
    console.error("API error:", error.message);
    return Response.json({ blog: null, blogs: [] });
  }
}