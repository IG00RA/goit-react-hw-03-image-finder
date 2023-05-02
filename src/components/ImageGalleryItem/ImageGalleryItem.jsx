import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ imgUrl, imgAlt }) => {
  return (
    <>
      <img alt={imgAlt} src={imgUrl} />
    </>
  );
};

ImageGalleryItem.propTypes = {};
