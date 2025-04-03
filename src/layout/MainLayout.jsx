import { Outlet, useLocation } from "react-router"

function MainLayout() {
const location = useLocation();
const isDetailsPage = location.pathname.startsWith('/pokedex/')

  return (
    <div>
      {!isDetailsPage &&(
        <div className="bg-black w-full h-20 mt-auto">
          <div className="bg-red-600 w-full h-12"></div>
        </div>
      )}
        <Outlet />
      </div>
  )
}

export default MainLayout
