import { capitalize } from "../../utils/capitalize";
import { TYPE_LABELS } from "../../constants/pokemon";
import * as S from "./styles";

interface TagTypeProps {
  children: string;
  size?: "high";
}

const TagType = ({ children, size }: TagTypeProps) => {
  const label = TYPE_LABELS[children] ?? capitalize(children);
  return <S.TagType $size={size}>{label}</S.TagType>;
};

export default TagType;
