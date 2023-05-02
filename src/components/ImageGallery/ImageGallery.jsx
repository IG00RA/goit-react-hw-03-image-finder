import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ data }) => {
  console.log(data);
  if (data.length !== 0) {
    return (
      <ul className="gallery">
        {data.map(item => (
          <li key={item.id}>
            <ImageGalleryItem imgUrl={item.webformatURL} imgAlt={item.tags} />
          </li>
        ))}
      </ul>
    );
  }
};

ImageGallery.propTypes = {};

// getImage(userInput);

// <StyledList>
//   {getContacts.map(contact => (
//     <StyledItem
//       <ContactItem contact={contact} />
//       <button onClick={() => onDelete(contact.id)}>Delete</button>
//     </StyledItem>
//   ))}
// </StyledList>;
