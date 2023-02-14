import genres from '../data/genres.json'

const colorHelper = (string) => {
  return Object.keys(genres).find(key => genres[key] === string);

};


export default colorHelper;
