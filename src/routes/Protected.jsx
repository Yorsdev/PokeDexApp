import { Navigate, Outlet } from "react-router"
import { useName } from "../context/nameContext"

function Protected({ children }) {
  const [state] =useName()

  if(!state.name) {
    return <Navigate to='/' />
  }
  return children ? children : <Outlet />
}

export default Protected
