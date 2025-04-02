import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function Details() {
  const params = useParams()
  const [pokemon, setPokemon] = useState({})

useEffect(() => {
  if (params.name) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
    .then((res) => {
      setPokemon(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}, [params.name])

if (!pokemon.name) return null

  return (
    <div>
      <div className={`w-full h-[600px] type-bg--${pokemon.types[0].type.name} flex items-center justify-center`}>
      <img
          className='size-4/5 object-contain'
          src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
          alt={pokemon.name}
        />
      </div>

      <section className="max-w-5x1 mx-auto px-4 pt-8">
        <h3 className='text-5xl bold text-center capitalize'>{pokemon.name}</h3>
      </section>
    </div>
  )
}

export default Details
