const BASE_URL = "https://api.slingacademy.com/v1/sample-data/blog-posts";

export async function getBlogs(page = 1) {
  try {
    const res = await fetch(
      `https://api.slingacademy.com/v1/sample-data/blog-posts?page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("API failed:", res.status);
      return [];
    }

    const data = await res.json();

    return data.blogs || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function getBlogById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const text = await res.text();

    const data = JSON.parse(text);

    return data.blog || null;
  } catch {
    return null;
  }
}
