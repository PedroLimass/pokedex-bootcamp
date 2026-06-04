import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import * as S from "./styles";
import Logo from "../../assets/logoPokemon.png";
import { CustomLink } from "../CustomLink";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/pokemons", label: "Pokémons" },
  { to: "/compare", label: "Comparar" },
  { to: "/contacts", label: "Contato" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <S.Container>
      <S.Header>
        <Link to="/" className="logo">
          <img src={Logo} alt="Logo Pokémon" />
        </Link>

        <S.DesktopNav>
          {NAV_LINKS.map((link) => (
            <CustomLink key={link.to} to={link.to}>
              {link.label}
            </CustomLink>
          ))}
        </S.DesktopNav>

        <S.MenuButton
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </S.MenuButton>
      </S.Header>

      <S.MobileNav $open={isOpen}>
        {NAV_LINKS.map((link) => (
          <CustomLink key={link.to} to={link.to}>
            {link.label}
          </CustomLink>
        ))}
      </S.MobileNav>

      <S.Backdrop $open={isOpen} onClick={() => setIsOpen(false)} />
    </S.Container>
  );
};

export default Header;
