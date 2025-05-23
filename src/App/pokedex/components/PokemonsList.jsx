import NotFound from "../../../utils/NotFound";
import PokemonCard from "./PokemonCard";

function PokemonsList({ pokemons }) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4'>
      {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.name} url={pokemon.url} />
      ))}

      {pokemons.length === 0 && <NotFound />}
    </div>
  );
}

export default PokemonsList;
