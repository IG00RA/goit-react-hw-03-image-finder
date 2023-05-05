import PropTypes from 'prop-types';
import { ButtonStyle } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonStyle onClick={() => onLoadMore()} type="button">
      Load more
    </ButtonStyle>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
