import { getBlogById } from "@/lib/api";

export default async function BlogPage({ params }) {
    const p = await params;
    const id = Number(p.id);

    const blog = await getBlogById(id);

    if (!blog) {
        return <h1 className="text-center mt-10">Blog not found</h1>;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">

            <a href="/" className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-blue-600 border border-blue-200 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md">
                ← Back
            </a>

            <img src={blog.photo_url} alt={blog.title} className="w-full h-64 object-cover rounded mb-6"/>

            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

            <p className="text-gray-600 mb-6">{blog.description}</p>

            <div className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: blog.content_html }}></div>
        </main>
    );
}