import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Image from 'next/image';

type Attack = {
  name: string;
  type: string;
  damage: number;
};

type Evolution = {
  name: string;
};

type Pokemon = {
  id: string;
  name: string;
  image: string;
  types: string[];
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions?: Evolution[];
};

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

  const { data, loading, error } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON, {
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
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={150}
        height={150}
      />
      <p>Types: {pokemon.types.join(', ')}</p>

      <h3>Fast Attacks</h3>
      <ul>
        {pokemon.attacks.fast.map((atk: Attack) => (
          <li key={atk.name}>
            {atk.name} ({atk.type}) - {atk.damage}
          </li>
        ))}
      </ul>

      <h3>Special Attacks</h3>
      <ul>
        {pokemon.attacks.special.map((atk: Attack) => (
          <li key={atk.name}>
            {atk.name} ({atk.type}) - {atk.damage}
          </li>
        ))}
      </ul>

      {pokemon.evolutions?.length ? (
        <>
          <h3>Evolutions</h3>
          <ul>
            {pokemon.evolutions.map((evo: Evolution) => (
              <li key={evo.name}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    push(`/?name=${evo.name.toLowerCase()}`);
                  }}
                  style={{ color: 'blue', cursor: 'pointer' }}
                >
                  {evo.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
