/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function PostPage({ params }: { params: { slug: string } }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log(params);

  useEffect(() => {
    console.log("start load");
    async function getArticleDetail() {
      try {
        const res = await fetch(`/api/news/${params.slug}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setDetail(data);
      } catch (error) {
        console.error(error);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    }

    getArticleDetail();
  }, [params.slug]); // ✅ OK now

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-center text-gray-500">Loading article...</p>
      </main>
    );
  }

  if (!detail) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">Article not found.</p>
      </main>
    );
  }

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
      <img
        src={detail.image}
        alt={detail.title}
        className="rounded-xl w-full mb-6 shadow-lg"
      />
      <article className="prose prose-lg">
        <p>{detail.description}</p>
      </article>
    </main>
  );
}
