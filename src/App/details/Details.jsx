import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    if (params.name) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        .then((res) => {
          setPokemon(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.name]);

  if (!pokemon.name) return null;

  return (
    <div
      className={`relative w-full h-screen flex flex-col sm:flex-row items-center justify-center type-bg--${pokemon.types[0].type.name} text-white p-4`}
    >
      
      <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-[6rem] md:text-[12rem] font-bold text-green-300 opacity-20">
        #{pokemon.id.toString().padStart(3, "0")}
      </h1>

      
      <div className="md:absolute md:left-10 flex flex-col items-center md:items-start text-lg text-center md:text-left">
        <p className="font-bold text-xl hover:text-gray-800 transition-all duration-300 ease-in-out">
          {pokemon.types[0].type.name.toUpperCase()}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold hover:text-gray-500 transition-all duration-300 ease-in-out">{pokemon.name}</h2>
        <p className="mt-2 text-sm hover:text-black transition-all duration-300 ease-in-out">
          {pokemon.height / 10}M <br /> {pokemon.weight / 10}KG <br />{" "}
          {pokemon.abilities[0].ability.name}
        </p>
      </div>

      
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="max-h-[40vh] md:max-h-[60vh] object-contain"
      />

      
      <div className="md:absolute md:right-10 flex flex-wrap justify-center md:flex-col space-x-2 md:space-x-0 md:space-y-2 text-lg">
        {pokemon.stats.map((stat) => (
          <div
            key={stat.stat.name}
            className="flex items-center space-x-2 md:space-x-6 ml-0"
          >
            <span className="capitalize w-16 md:w-15 font-semibold text-sm md:text-base">
              {stat.stat.name}
            </span>
            <div className="w-20 md:w-40 h-3 bg-white bg-opacity-30 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${stat.base_stat}%` }}
              ></div>
            </div>
            <span className="w-8 md:w-10 text-right text-sm md:text-base">
              {stat.base_stat}/150
            </span>
          </div>
        ))}
      </div>
      <button
        className="btn mt-4 md:mt-0 md:bottom-0 md:left-1/2 md:-translate-x-50 md:translate-y-60 sm:-translate-x-80 sm:translate-y-40"
        onClick={() => navigate("/pokedex")}
      >
        Volver
      </button>
    </div>
  );
}

export default Details;
