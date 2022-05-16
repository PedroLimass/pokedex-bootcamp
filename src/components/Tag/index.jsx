import { capitalize } from "../../utils/capitalize";
import * as S from "./styles";

const TagType = ({ children, size }) => {
  return <S.TagType size={size}>{capitalize(children)}</S.TagType>;
};

export default TagType;
