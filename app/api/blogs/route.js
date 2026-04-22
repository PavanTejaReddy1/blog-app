export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;
    const id = searchParams.get("id");

    let url = `https://api.slingacademy.com/v1/sample-data/blog-posts?page=${page}`;

    // ✅ Add headers to avoid blocking
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    const data = await res.json();

    // ✅ Handle single blog
    if (id) {
      const blog = (data.blogs || []).find(
        (b) => String(b.id) === String(id)
      );
      return Response.json({ blog });
    }

    return Response.json({ blogs: data.blogs || [] });

  } catch (error) {
    console.error("API error:", error.message);
    return Response.json({ blogs: [], blog: null });
  }
}