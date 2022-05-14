import { Link, useMatch, useResolvedPath } from "react-router-dom";
import * as S from "./styles";

export const CustomLink = ({ children, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <S.ContainerCustom>
      <Link className={`${match && "active"}`} to={to}>
        {children}
      </Link>
      {/* {match && " (active)"} */}
    </S.ContainerCustom>
  );
};
