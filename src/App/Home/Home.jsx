import NameForm from "./components/NameForm";
function Home() {
  return (
    <>
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        preload="auto"
        src="/bgwar.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 w-full h-dvh flex justify-center items-center">
        <div className="text-center">
          {/* <h1 className="text-5x1 font-semibold mb-4">POKEDEX</h1> */}
          <img
            className="size-full p-4"
            src="/pokemon-logo.svg"
            alt="Logo de pokémon"
          />
          <h2 className="text-xl font-bold text-yellow-500 animate-pulse">¡Hola Entrenador!</h2>
          <p className="text-white mb-4">Dame tu nombre para emprender este viaje</p>

          <NameForm />
        </div>

        <div
          className="absolute left-0 
      bottom-0 bg-black w-full h-20
      mt-auto"
        >
          <div
            className="bg-red-600 w-full 
        h-12"
          ></div>
        </div>
      </div>
    </>
  );
}
export default Home;
