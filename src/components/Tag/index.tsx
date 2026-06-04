import { capitalize } from "../../utils/capitalize";
import * as S from "./styles";

interface TagTypeProps {
  children: string;
  size?: "high";
}

const TagType = ({ children, size }: TagTypeProps) => {
  return <S.TagType $size={size}>{capitalize(children)}</S.TagType>;
};

export default TagType;
