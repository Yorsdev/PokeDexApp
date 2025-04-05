import { useNavigate } from 'react-router'

function NotFound() {
const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div>

      </div>

      <h1 className="text text-8xl font-bold">
        4<span className="font-bold text-red-500">0</span>4
      </h1>
      <span className="font-semibold text-red-500 mb-4">Lo que buscas no existe</span>
      <img
        className="object-contain max-w-full"
        src="/snorlax-hoppip.gif"
        alt="Gif de Snorlax tumbado sobre el suelo, y pokemon rosa saltando sobre el"
      />
      <p className="text text-3xl font-semibold text-blue-200 mt-4">
        Opps ¡Parece que un Snorlax ha bloqueado tu camino!
      </p>
      <button class='btn mt-2' onClick={() => navigate('/pokedex')}>Get Back</button>
    </div>
  );
}

export default NotFound;
