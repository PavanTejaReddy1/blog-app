import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { getBlogs } from "@/lib/api";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const blogs = await getBlogs(page);

  if (!blogs.length) {
    return (
      <main className="text-center mt-20">
        <h2 className="text-xl font-semibold">Blogs unavailable</h2>
        <p className="text-gray-500">
          Unable to fetch data from external API.
        </p>
      </main>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Top Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {blogs.slice(0, 3).map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="block">
              <div className="relative rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:border-black/20">

                <img src={blog.photo_url} alt={blog.title} className="w-full h-56 object-cover group-hover:scale-110 transition duration-300" />

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10">

          {page > 1 && (
            <a href={`/?page=${page - 1}`} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
              ← Prev
            </a>
          )}

          <a href={`/?page=${page + 1}`} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Next →
          </a>

        </div>

      </div>
    </>
  );
}
