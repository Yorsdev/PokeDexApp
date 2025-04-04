import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useName } from "../../context/nameContext";
import PokemonsList from "./components/PokemonsList";
import PokemonCard from "./components/PokemonCard";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

function Pokedex() {
  const navigate = useNavigate();
  const [state] = useName();
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const getPokemons = async () => {
    axios
      .get(baseUrl + `?limit=150`)
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type?limit=21")
      .then((response) => {
        setTypes(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredPokemons(pokemons);
      setSinglePokemon(null);
      return;
    }

    if (selectedType) {
      axios
        .get("https://pokeapi.co/api/v2/type/" + selectedType)
        .then((response) => {
          setFilteredPokemons(response.data.pokemon.map((p) => p.pokemon));
          setSinglePokemon(null);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedType]);

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
        // baseUrl + "/" + response.data.name
        setSinglePokemon(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-gray-500">
      <div className="max-w-5xl mx-auto px-4 z-20">
        <div className="flex flex-col items-center">
          <h2 className="m-8">
            <span className="text-red-500 font-semibold">
              Bienvenido {state.name}
            </span>
            , aquí pordrás encontrar tu pokémon favorito
            <button class="btn2 mt-2 ml-4 justify-center" onClick={() => navigate("/")}>
              Cambiar Nombre
            </button>
          </h2>

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
                <option
                  key={type.name}
                  value={type.name}
                  className="capitalize"
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {singlePokemon ? (
          <PokemonCard url={baseUrl + "/" + singlePokemon.name} />
        ) : (
          <PokemonsList pokemons={filteredPokemons} />
        )}
      </div>
    </div>
  );
}

export default Pokedex;
