import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (router.query.name) {
      setSearch(router.query.name as string);
    }
  }, [router.query.name]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== '') {
      router.push(`/?name=${search.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokemon"
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button type="submit">Search</button>
    </form>
  );
};
