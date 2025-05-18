import Head from 'next/head';
import { SearchInput } from '@/components/SearchInput';
import { PokemonResult } from '@/components/PokemonResult';

export default function Home() {
    return (
        <>
            <Head>
                <title>Search Pokémon</title>
                <meta name="description" content="Search for Pokémon by name using GraphQL" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
                <h1 style={{ textAlign: 'center' }}>Search Pokemon</h1>
                <SearchInput />
                <PokemonResult />
            </main>
        </>
    );
}
