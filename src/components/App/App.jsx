import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { GlobalStyle } from '../GlobalStyles';
import { AppStyle, StyledSection } from './App.styled';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage } from '../../api';
import { Preview } from 'components/Preview/Preview';

export class App extends Component {
  state = {
    userInput: '',
    data: [],
    error: null,
    isLoading: false,
    showModal: false,
    visibleButton: false,
    currentImg: '',
    currentAlt: '',
    page: 1,
    preview: true,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.userInput !== this.state.userInput ||
      prevState.page !== this.state.page
    ) {
      this.fetchImg(this.state.userInput, this.state.page);
    }
  }

  fetchImg = async (input, page) => {
    try {
      this.setState({ isLoading: true });
      this.setState({ status: 'search' });
      const fetchImg = await getImage(input, page);

      this.setState(prevState => ({
        data: [...prevState.data, ...fetchImg.hits],
      }));
      this.setState({ visibleButton: false });
      if (fetchImg.total > 12) {
        this.setState({ visibleButton: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  loadMore = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  handleSubmit = userInput => {
    if (userInput.trim().length > 0) {
      this.setState({ userInput: userInput });
      this.setState({ page: 1 });
      this.setState({ data: [] });
    } else {
      toast.error('Please enter your request', {
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

  startDiscover = () => {
    this.setState({ preview: false });
  };

  render() {
    const { handleSubmit, toggleModal, loadMore, openImage, state } = this;
    const { preview } = state;
    if (preview) {
      return <Preview startDiscover={this.startDiscover} />;
    }

    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        <StyledSection>
          <AppStyle>
            <GlobalStyle />
            {state.showModal && (
              <Modal onClose={toggleModal}>
                <img src={state.currentImg} alt={state.currentAlt} />
              </Modal>
            )}
            {state.isLoading ? (
              <Loader />
            ) : (
              <ImageGallery
                data={state.data}
                fullImg={openImage}
                status={state.status}
              />
            )}
            {state.visibleButton && <Button onLoadMore={loadMore} />}
            {this.setState.error && <div>{this.setState.error}</div>}
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
          </AppStyle>
        </StyledSection>
      </>
    );
  }
}
