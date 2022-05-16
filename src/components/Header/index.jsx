/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import * as S from "./styles";
import Logo from "../../assets/logoPokemon.png";
import { CustomLink } from "../CustomLink";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(useLocation());
  const location = useLocation();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (currentLocation.pathname !== location.pathname) {
      setShowMenu(false);
      setCurrentLocation(location);
    }
  }, [currentLocation.pathname, location]);

  return (
    <S.Container>
      <S.Header>
        <Link to="/">
          <img src={Logo} alt="Logo Pokemon" />
        </Link>
        <div className="boxMenu">
          {showMenu ? (
            <GrClose className="closeIcon" onClick={handleMenu} />
          ) : (
            <GiHamburgerMenu
              className="menuIcon"
              onClick={handleMenu}
              showMenu={showMenu}
            />
          )}
          <S.Menu showMenu={showMenu}>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/pokemons">Pokemons</CustomLink>
            <CustomLink to="/contacts">Contato</CustomLink>
          </S.Menu>
        </div>
      </S.Header>
    </S.Container>
  );
};

export default Header;
