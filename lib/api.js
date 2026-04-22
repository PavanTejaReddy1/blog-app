const BASE_URL = "https://api.slingacademy.com/v1/sample-data/blog-posts";

// get all blogs
export async function getBlogs(page = 1) {
  const limit = 9;
  const offset = (page - 1) * limit;

  const res = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  return data.blogs;
}

// get single blog
export async function getBlogById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();

  return data.blog;
}