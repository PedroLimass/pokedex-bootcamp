import { Link } from "react-router-dom";
import * as S from "./styles";
import Logo from "../../assets/logoPokemon.png";
import { CustomLink } from "../CustomLink";

const Header = () => {
  return (
    <S.Container>
      <S.Header>
        <Link to="/">
          <img src={Logo} alt="Logo Pokemon" />
        </Link>
        <S.Menu>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/pokemons">Pokemons</CustomLink>
          <CustomLink to="/contacts">Contato</CustomLink>
        </S.Menu>
      </S.Header>
    </S.Container>
  );
};

export default Header;
