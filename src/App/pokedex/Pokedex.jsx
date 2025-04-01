import { useEffect, useState } from "react";
import axios from "axios";
import { useName } from "../../context/nameContext";
import PokemonsList from "./components/PokemonsList";
import PokemonCard from "./components/PokemonCard";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

function Pokedex() {
  const [state] = useName();
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");

  //Función para cargar siempre los primeros 20
  const getPokemons = async () => {
    axios
      .get(baseUrl + `?limit=150`)
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((error) => console.error(error));
  };

  //Traer los primeros 150 pokemons
  useEffect(() => {
    getPokemons();
  }, []);

  //Trae la lista de tipos de pokemon
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type?limit=21")
      .then((response) => {
        setTypes(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  //Filtra los pokemon por tipo
  useEffect(() => {
    if(selectedType === 'all') {
      setFilteredPokemons(pokemons)
      setSinglePokemon(null)
      return
    }
    axios
      .get("https://pokeapi.co/api/v2/type/" + selectedType)
      .then((response) => {
        setFilteredPokemons(response.data.pokemon.map(p => p.pokemon));
        setSinglePokemon(null);
      })
      .catch((error) => console.error(error));
  }, [selectedType]);

  //Filtrar los pokemons en tiempo real
  useEffect(() => {
    if (!search) {
      setFilteredPokemons(pokemons);
      setSinglePokemon(null);
      return;
    }

    setFilteredPokemons(
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemons]);

  const searchPokemon = () => {
    if (!search) {
      setFilteredPokemons(pokemons);
      setSinglePokemon(null);
      return;
    }

    axios
      .get(baseUrl + "/" + search.toLowerCase())
      .then((response) => {
        setSinglePokemon(baseUrl + "/" + response.data.name);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="mb-8">
          <span className="text-red-500 font-semibold">
            Bienvenido {state.name}
          </span>
          , aquí pordrás encontrar tu pokémon favorito
        </h2>

        {/*Aquí va el buscador y el filtro*/}
        <div className="mb-9">
          <input
            type="text"
            placeholder="Buscar Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
          <button className="btn" onClick={searchPokemon}>
            Buscar
          </button>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input ml-4"
          >
            <option value="all">All pokémons</option>
            {types.map((type) => (
              <option key={type.name} value={type.name} className="capitalize">
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Aquí va el pokemon  (Renderizado condicional)*/}

        {singlePokemon ? (
          <PokemonCard url={singlePokemon} />
        ) : (
          <PokemonsList pokemons={filteredPokemons} />
        )}
        {/*Arriba va la lista de pokemones*/}
      </div>
    </div>
  );
}

export default Pokedex;
