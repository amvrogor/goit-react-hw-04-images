import axios from 'axios';

export async function pixaBayAPI(searchText, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32952504-2527882a1c0dde7bb411b7994';
  const searchParams = new URLSearchParams({
    key: KEY,
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 12,
  });
  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data;
}
