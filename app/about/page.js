export const revalidate = 0;

export default async function Page() {
  await new Promise((r) => setTimeout(r, 4000));

  return <h1>About</h1>;
}
