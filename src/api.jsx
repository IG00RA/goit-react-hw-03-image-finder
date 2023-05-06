import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34434498-1935a5c1deda7e012c81c56f8';

export const getImage = async (userInput, page = 1) => {
  const response = await axios.get(
    `/?q=${userInput}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
