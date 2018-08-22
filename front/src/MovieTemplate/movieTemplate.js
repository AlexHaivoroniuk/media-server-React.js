import PropTypes from 'prop-types';

export let MovieTemplate = PropTypes.shape({
  _id: PropTypes.string,
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Plot: PropTypes.string,
  Year: PropTypes.string,
  Genre: PropTypes.string,
  Director: PropTypes.string,
  Country: PropTypes.string,
  Rated: PropTypes.string,
  Writer: PropTypes.string,
  Language: PropTypes.string,
  Awards: PropTypes.string,
  imdbRating: PropTypes.string,
  Production: PropTypes.string,
  Released: PropTypes.string
});
