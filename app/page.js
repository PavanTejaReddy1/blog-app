"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://api.slingacademy.com/v1/sample-data/blog-posts")
      .then(res => res.json())
      .then(data => setBlogs(data.blogs || []))
      .catch(() => setBlogs([]));
  }, []);

  if (!blogs.length) {
    return <p>Loading or API blocked</p>;
  }

  return (
    <div>
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
