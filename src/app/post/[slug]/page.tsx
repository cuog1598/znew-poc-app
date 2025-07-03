export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 capitalize">
        {params.slug.replace(/-/g, " ")}
      </h1>
      <article className="prose prose-lg">
        <p>
          This is a placeholder article page. In a full application, content for
          the article slug <strong>{params.slug}</strong> would be fetched and
          rendered here.
        </p>
        <p>
          Additional sections such as related news, comments, author bio, and
          images would enhance the experience.
        </p>
      </article>
    </main>
  );
}
