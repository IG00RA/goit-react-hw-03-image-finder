import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import { GlobalStyle } from './GlobalStyles';
import { AppStyle } from './App.styled';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34434498-1935a5c1deda7e012c81c56f8';

export class App extends Component {
  state = {
    userInput: '',
    data: [],
    isLoading: false,
    showModal: false,
    currentImg: '',
    currentAlt: '',
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  getImage = async (userInput, page = 1) => {
    const response = await axios.get(
      `/?q=${userInput}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.setState({
      data: response.data.hits,
    });
    this.setState({ isLoading: false });
  };

  handleSubmit = userInput => {
    this.setState({ isLoading: true });
    this.setState({ userInput: userInput });
    this.getImage(userInput);
  };
  openImage = (fullUrl, alt) => {
    this.setState({ currentImg: fullUrl });
    this.setState({ currentAlt: alt });
    this.toggleModal();
  };

  render() {
    const { handleSubmit, toggleModal, openImage, state } = this;
    return (
      <AppStyle>
        <GlobalStyle />
        {state.showModal && (
          <Modal onClose={toggleModal}>
            <img src={state.currentImg} alt={state.currentAlt} />
          </Modal>
        )}
        <Searchbar onSubmit={handleSubmit} />
        {state.isLoading ? (
          <Loader />
        ) : (
          <ImageGallery data={state.data} fullImg={openImage} />
        )}
      </AppStyle>
    );
  }
}
