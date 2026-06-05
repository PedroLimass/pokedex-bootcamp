import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import GlobalStyle from "../styles/global";
import Home from "../pages/Home";
import { PokemonsPage } from "../pages/Pokemons";
import { ComparePage } from "../pages/Compare";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<PokemonsPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default AppRoutes;
