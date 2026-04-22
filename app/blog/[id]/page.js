"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogPage() {
    const p = useParams();
    const id = Number(p.id);

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchBlog() {
        try {
            const res = await fetch(
                "https://api.slingacademy.com/v1/sample-data/blog-posts"
            );

            const data = await res.json();

            const found = data.blogs.find(
                (b) => Number(b.id) === id
            );

            setBlog(found);
        } catch (error) {
            console.error(error);
            setBlog(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if (loading) {
        return <h1 className="text-center mt-10">Loading...</h1>;
    }

    if (!blog) {
        return <h1 className="text-center mt-10">Blog not found</h1>;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">

            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-blue-600 border border-blue-200 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md">
                ← Back
            </Link>

            <img src={blog.photo_url} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />

            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

            <p className="text-gray-600 mb-6">{blog.description}</p>

            <div className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: blog.content_html }}></div>
        </main>
    );
}