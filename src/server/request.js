import axios from 'axios';

const instance = req => axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5c0b417d6162b83fe0a50c81/example',
  headers: {
    cookie: req.get('cookie') || '',
  },
});

export default instance;
