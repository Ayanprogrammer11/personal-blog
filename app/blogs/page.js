import BlogList from "../components/BlogList";

export const revalidate = 0;

export default async function Page() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <BlogList />
    </div>
  );
}
