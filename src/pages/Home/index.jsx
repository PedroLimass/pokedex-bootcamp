// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import PokemonHome from "../../assets/BannerComplete.svg";
import * as S from "./styles";

const Home = () => {
  return (
    <S.Container>
      <S.InfoPokedex>
        <h1>Qual pokemon você escolheria?</h1>
        <p>
          Você pode saber o tipo de Pokémon, seus pontos <br /> fortes, fracos e
          habilidades.
        </p>
        <Link className="btnPokemonPage" to="/pokemons">
          Veja os pokemons
        </Link>
      </S.InfoPokedex>
      <S.AssetSide>
        <img src={PokemonHome} alt="Pikachu Banner" />
      </S.AssetSide>
    </S.Container>
  );
};

export default Home;
