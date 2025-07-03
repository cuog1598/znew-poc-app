/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

// Fetch articles from the internal API (SSR enabled by using "no-store")
async function getArticles() {
  const res = await fetch("http://localhost:3000/api/news", {
    cache: "no-store",
  });
  return res.json();
}

export default async function HomePage() {
  const articles: any = await getArticles();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        Today’s Top Stories
      </h1>
      <div className="grid gap-8">
        {articles.map((article: any) => (
          <Link
            key={article.id}
            href={`/post/${article.slug}`}
            className="group flex flex-col md:flex-row items-center md:items-start gap-6 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg transition overflow-hidden"
          >
            <div className="w-full md:w-72 h-48 relative">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover rounded-t-md md:rounded-l-md md:rounded-t-none"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="flex-1 px-6 py-4 md:py-6">
              <div className="text-sm text-indigo-600 font-medium uppercase mb-1">
                {article.category}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition">
                {article.title}
              </h2>
              <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                {article.description}
              </p>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <span>By {article.author}</span>
                <span className="mx-2">•</span>
                <span>
                  {format(new Date(article.publishedAt), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
