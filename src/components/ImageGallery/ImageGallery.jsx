import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { BsCardImageSvg, ImageGalleryStyle } from './ImageGallery.styled';
import { ImageGalleryItemStyle } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGallery = ({ data, fullImg, status }) => {
  if (status === 'idle') {
    return <BsCardImageSvg />;
  }
  if (data.length !== 0) {
    return (
      <ImageGalleryStyle>
        {data.map(item => (
          <ImageGalleryItemStyle key={item.id}>
            <ImageGalleryItem
              openImage={fullImg}
              fullUrl={item.largeImageURL}
              imgUrl={item.webformatURL}
              imgAlt={item.tags}
            />
          </ImageGalleryItemStyle>
        ))}
      </ImageGalleryStyle>
    );
  }
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  fullImg: PropTypes.func.isRequired,
};
