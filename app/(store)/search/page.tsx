export default async function SearchPage({
  searchParams
}: {
  searchParams: {
    query: string;
  }
}) {
  const { query } = await searchParams;

  return (
    <div>SearchPage for {query}</div>
  )
}