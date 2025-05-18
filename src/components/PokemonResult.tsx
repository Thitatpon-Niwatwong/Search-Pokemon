import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_POKEMON = gql`
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        name
      }
    }
  }
`;

export const PokemonResult = () => {
  const { query, push } = useRouter();
  const name = query.name as string;

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
    skip: !name,
  });

  if (!name) return <p>Please search for a Pokemon.</p>;
  if (loading) return <p>Loading...</p>;
  if (error || !data?.pokemon) return <p>Pokémon not found.</p>;

  const { pokemon } = data;

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} width={150} />
      <p>Types: {pokemon.types.join(', ')}</p>

      <h3>Fast Attacks</h3>
      <ul>
        {pokemon.attacks.fast.map((atk: any) => (
          <li key={atk.name}>
            {atk.name} ({atk.type}) - {atk.damage}
          </li>
        ))}
      </ul>

      <h3>Special Attacks</h3>
      <ul>
        {pokemon.attacks.special.map((atk: any) => (
          <li key={atk.name}>
            {atk.name} ({atk.type}) - {atk.damage}
          </li>
        ))}
      </ul>

      {pokemon.evolutions?.length > 0 && (
        <>
          <h3>Evolutions</h3>
          <ul>
            {pokemon.evolutions.map((evo: any) => (
              <li key={evo.name}>
                <a
                  href="#"
                  onClick={() => push(`/?name=${evo.name.toLowerCase()}`)}
                  style={{ color: 'blue', cursor: 'pointer' }}
                >
                  {evo.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
