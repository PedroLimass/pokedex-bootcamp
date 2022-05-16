import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import GlobalStyle from "../styles/global";
import Home from "../pages/Home";
import { PokemonsPage } from "../pages/Pokemons";

const routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<PokemonsPage />} />
        <Route path="/contacts" element={<h1>Contatos</h1>} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default routes;
