export async function getBlogs(page = 1) {
  try {
    // ✅ Always build full URL safely
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/blogs?page=${page}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error("getBlogs error:", error.message);
    return [];
  }
}

export async function getBlogById(id) {
  try {
    const baseUrl =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/blogs?id=${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    const data = await res.json();

    return data.blog || null;
  } catch (error) {
    console.error("getBlogById error:", error.message);
    return null;
  }
}