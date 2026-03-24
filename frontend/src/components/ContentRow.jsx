import ContentCard from './ContentCard';
import Spinner from './Spinner';

export default function ContentRow({ title, contents, loading }) {
  if (loading) return <Spinner />;
  if (!contents || contents.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-white text-lg font-semibold mb-3 px-6">{title}</h2>
      <div className="scroll-row flex gap-3 px-6">
        {contents.map((c) => (
          <ContentCard key={c.id} content={c} />
        ))}
      </div>
    </div>
  );
}
