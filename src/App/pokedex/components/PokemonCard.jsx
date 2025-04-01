import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"

function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState({})

useEffect(() => {
  axios.get(url)
  .then(response => {
    setPokemon(response.data)
  })
  .catch(error => console.log(error))
}, [url])


  return (
    <Link to={`/pokedex/${pokemon.name}`} 
        className='block border'>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
    </Link>
  )
}

export default PokemonCard
