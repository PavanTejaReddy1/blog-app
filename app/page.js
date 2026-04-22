"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const limit = 12;
      const offset = (page - 1) * limit;

      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/blog-posts?offset=${offset}&limit=${limit}`
      );

      const data = await res.json();

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg">
        Loading blogs...
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No blogs available.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-bold mb-6">Top Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {blogs.slice(0, 3).map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div className="relative rounded-xl overflow-hidden group cursor-pointer transition hover:scale-105 hover:shadow-xl">

              <img src={blog.photo_url} alt={blog.title} className="w-full h-56 object-cover group-hover:scale-110 transition"/>

              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white font-bold text-lg">
                  {blog.title}
                </h3>
              </div>

            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">All Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">

        {page > 1 && (
          <button onClick={() => setPage((prev) => prev - 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
            ← Prev
          </button>
        )}

        <button onClick={() => setPage((prev) => prev + 1)} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          Next →
        </button>

      </div>

    </div>
  );
}