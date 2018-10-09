import PropTypes from 'prop-types';

export let TVTemplate = PropTypes.shape({
  _id: PropTypes.string,
  Poster: PropTypes.string,
  Title: PropTypes.string,
  OriginalTitle: PropTypes.string,
  Plot: PropTypes.string,
  Year: PropTypes.shape({ First: PropTypes.string, Last: PropTypes.string }),
  Genre: PropTypes.string,
  Director: PropTypes.string,
  Country: PropTypes.string,
  Writer: PropTypes.string,
  Language: PropTypes.string,
  Production: PropTypes.string,
  Runtime: PropTypes.string,
  NumberOf: PropTypes.shape({
    Seasons: PropTypes.string,
    Episodes: PropTypes.string
  }),
  Seasons: PropTypes.arrayOf(
    PropTypes.shape({
      Number: PropTypes.string,
      Name: PropTypes.string,
      EpisodeCount: PropTypes.string,
      Year: PropTypes.string,
      Owerview: PropTypes.string,
      Poster: PropTypes.string
    })
  )
});
