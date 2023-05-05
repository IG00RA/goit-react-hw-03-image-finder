import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import { GlobalStyle } from './GlobalStyles';
import { AppStyle } from './App.styled';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34434498-1935a5c1deda7e012c81c56f8';

export class App extends Component {
  state = {
    userInput: '',
    data: [],
    isLoading: false,
    showModal: false,
    visibleButton: false,
    currentImg: '',
    currentAlt: '',
    perPage: 24,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  getImage = async (userInput, perPage = 12) => {
    const response = await axios.get(
      `/?q=${userInput}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    this.setState({
      data: response.data.hits,
    });
    this.setState({ isLoading: false });
    this.setState({ visibleButton: true });
    if (response.data.total <= 12) {
      this.setState({ visibleButton: false });
    }
  };
  loadMore = () => {
    this.setState({
      perPage: this.state.perPage + 12,
    });
    this.getImage(this.state.userInput, this.state.perPage);
  };

  handleSubmit = userInput => {
    if (userInput.trim().length > 0) {
      this.setState({ visibleButton: false });
      this.setState({ isLoading: true });
      this.setState({ userInput: userInput });
      this.getImage(userInput);
      this.setState({
        perPage: 24,
      });
    } else {
      toast('Please enter your request', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  openImage = (fullUrl, alt) => {
    this.setState({ currentImg: fullUrl });
    this.setState({ currentAlt: alt });
    this.toggleModal();
  };

  render() {
    const { handleSubmit, toggleModal, loadMore, openImage, state } = this;
    return (
      <AppStyle>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
        {state.visibleButton && <Button onLoadMore={loadMore} />}
      </AppStyle>
    );
  }
}
