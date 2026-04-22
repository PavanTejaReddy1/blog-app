import Link from "next/link";

export default function BlogCard({ blog }) {
  const { id, title, photo_url } = blog;

  return (
    <Link href={`/blog/${id}`} className="block group">
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:border-black/20">

        <div className="overflow-hidden">
          <img src={photo_url} alt={title} className="w-full h-52 object-cover transition duration-500 ease-in-out group-hover:scale-110" />
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-lg">{title}</h2>
        </div>

      </div>
    </Link>
  );
}