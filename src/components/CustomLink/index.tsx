import type { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import * as S from "./styles";

interface CustomLinkProps {
  to: string;
  children: ReactNode;
}

export const CustomLink = ({ to, children }: CustomLinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <S.ContainerCustom>
      <Link className={match ? "active" : ""} to={to}>
        {children}
      </Link>
    </S.ContainerCustom>
  );
};
