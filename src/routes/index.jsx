import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import GlobalStyle from "../styles/global";

const routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/pokemons" element={<h1>Pokemons</h1>} />
        <Route path="/contacts" element={<h1>Contatos</h1>} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default routes;
