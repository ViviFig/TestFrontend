import genres from '../data/genres.json'

const genreHelper = (string) => {
  let genre = genres[string];
  return genre;
};

export default genreHelper;
