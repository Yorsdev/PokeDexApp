import { Route, Routes } from "react-router";
import Home from "../App/Home/Home";
import Pokedex from "../App/pokedex/Pokedex";
import Protected from "./Protected";
import MainLayout from "../layout/MainLayout";
import Details from "../App/details/Details";
import NotFound from "../utils/NotFound";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <h2>
            <Home />
          </h2>
        }
      />
      <Route
        path="/pokedex"
        element={
          <Protected>
            <MainLayout />
          </Protected>
        }
      >
        <Route index element={<Pokedex />} />
        <Route path=":name" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
