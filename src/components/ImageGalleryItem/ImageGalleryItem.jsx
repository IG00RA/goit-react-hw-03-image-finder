import PropTypes from 'prop-types';
import { ImageGalleryImageStyle } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ fullUrl, imgUrl, imgAlt, openImage }) => {
  return (
    <>
      <ImageGalleryImageStyle
        alt={imgAlt}
        src={imgUrl}
        onClick={() => openImage(fullUrl, imgAlt)}
      />
    </>
  );
};

ImageGalleryItem.propTypes = {
  fullUrl: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  openImage: PropTypes.func.isRequired,
};
