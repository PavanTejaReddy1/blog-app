import Link from "next/link";

export default function BlogCard({ blog }) {
    return (
        <Link href={`/blog/${blog.id}`}>
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">

                <img src={blog.photo_url} alt={blog.title} className="w-full h-48 object-cover" />

                <div className="p-4">
                    <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                        {blog.title}
                    </h2>

                    <p className="text-sm text-gray-600 line-clamp-3">
                        {blog.description}
                    </p>
                </div>

            </div>
        </Link>
    );
}