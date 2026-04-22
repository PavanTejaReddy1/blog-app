const BASE_URL = "https://api.slingacademy.com/v1/sample-data/blog-posts";

export async function getBlogs(page = 1) {
  try {
    const res = await fetch(
      `https://api.slingacademy.com/v1/sample-data/blog-posts?page=${page}`,
      {
        cache: "no-store",
      }
    );

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response from API");
    }

    const data = await res.json();
    return data.blogs || [];

  } catch (error) {
    console.error("API ERROR:", error.message);
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
