// lib/api.js

// 🔥 Helper to get base URL (works in local + Vercel)
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

// ✅ GET ALL BLOGS
export async function getBlogs(page = 1) {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}/api/blogs?page=${page}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data = await res.json(); 

    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error("getBlogs error:", error.message);
    return [];
  }
}

// ✅ GET SINGLE BLOG
export async function getBlogById(id) {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}/api/blogs?id=${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data = await res.json(); 

    const data = await res.json();
    return data.blog || null;
  } catch (error) {
    console.error("getBlogById error:", error.message);
    return null;
  }
}
