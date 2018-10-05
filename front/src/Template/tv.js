import PropTypes from 'prop-types';

export let TVTemplate = PropTypes.shape({
  _id: PropTypes.string,
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Plot: PropTypes.string,
  Year: PropTypes.shape({ First: PropTypes.string, Last: PropTypes.string }),
  Genre: PropTypes.string,
  Director: PropTypes.string,
  Country: PropTypes.string,
  Writer: PropTypes.string,
  Language: PropTypes.string,
  Production: PropTypes.string
});
