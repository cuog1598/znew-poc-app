// ✅ Không cần 'use client'
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`http://localhost:3000/api/news/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const detail = await res.json();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 capitalize">
        {detail.title}
      </h1>
      <div className="mb-4 text-sm text-gray-500 flex gap-4">
        <span>{detail.category}</span>
        <span>By {detail.author}</span>
        <span>{new Date(detail.publishedAt).toLocaleDateString()}</span>
      </div>
      <Image
        src={detail.image}
        alt={detail.title}
        width={1000}
        height={600}
        className="rounded-xl w-full mb-6 shadow-lg object-cover"
        priority
      />
      <article className="prose prose-lg">
        <p>{detail.description}</p>
      </article>
    </main>
  );
}
