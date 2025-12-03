import axios from 'axios';

const API_KEY = '43435737ce9b21c469c5ee154ddadf54'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (pages = 1) => {
  const allMovies = [];

  for (let i = 1; i <= pages; i++) {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: i
      }
    });

    allMovies.push(...response.data.results);
  }

  return allMovies;
};
