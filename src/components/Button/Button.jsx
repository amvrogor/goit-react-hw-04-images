import { LoadMoreButton } from './Button.styled';

export const Button = ({ onLoad }) => {
  return <LoadMoreButton onClick={onLoad}>Load more</LoadMoreButton>;
};
