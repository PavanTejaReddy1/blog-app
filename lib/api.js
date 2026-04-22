const BASE_URL = "https://api.slingacademy.com/v1/sample-data/blog-posts";

export async function getBlogs(page = 1) {
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    const res = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`, {
      cache: "no-store",
    });

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

    const data = await res.json(); 

    return data.blog || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
