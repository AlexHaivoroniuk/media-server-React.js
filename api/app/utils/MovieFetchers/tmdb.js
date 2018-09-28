const axios = require('axios');
const url = require('url');
const config = require("./../../../config/config");
const Movie = require("./../../models/Movie");
const logger = require('./../../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);

//https://api.themoviedb.org/3/search/movie?query=Lethal%20Weapon&year=1987&language=uk&api_key=9934054407a5293305b01c01afd24ce1
//https://api.themoviedb.org/3/movie/941?api_key=9934054407a5293305b01c01afd24ce1&language=uk

module.exports = function(options) {

    return searchMovie(options)
    .then(id => movie(options, id))
    .catch(() => searchTV(options)
        .then(id => tv(options, id))
        .catch(() => Promise.reject())
    );

    function searchMovie(options) {
        const endpoint = '/search/movie';
        const query = {
            query: options.title.trim(),
            year: options.year,
            api_key: config.tmdb.apiKey
        };
    
        const tmdbURL = url.format({
            protocol: 'https',
            hostname: 'api.themoviedb.org/3',
            pathname: endpoint,
            query: query
        });
        console.log('tmdb.get.seach/movie', tmdbURL);
        return axios
            .get(tmdbURL)
            .then(res => {
                /*console.log('-------');
                console.log(res.data);*/
                if(res.data.total_results > 0){
                    logger.info({ message: `INFO Movie "${options.title}" search was successful`, label: scriptName, line: __line})
                    
                    return res.data.results[0].id;
                } else {
                    return Promise.reject();
                }
            });
    }

    function searchTV(options) {
        const endpoint = '/search/tv';
        const query = {
            query: options.title.trim(),
            year: options.year,
            api_key: config.tmdb.apiKey
        };
    
        const tmdbURL = url.format({
            protocol: 'https',
            hostname: 'api.themoviedb.org/3',
            pathname: endpoint,
            query: query
        });
        console.log('tmdb.get.seach/tv', tmdbURL);
        return axios
            .get(tmdbURL)
            .then(res => {
                /*console.log('-------');
                console.log(res.data);*/
                if(res.data.total_results > 0){
                    logger.info({ message: `INFO TV "${options.title}" search was successful`, label: scriptName, line: __line})
                    
                    return res.data.results[0].id;
                } else {
                    return Promise.reject();
                }
            });
    }
    
    function movie(options, id) {
        const endpoint = `/movie/${id}`;
        const query = {
            append_to_response: 'credits,releases,images',
            language: 'uk',
            api_key: config.tmdb.apiKey
        };
    
        const tmdbURL = url.format({
            protocol: 'https',
            hostname: 'api.themoviedb.org/3',
            pathname: endpoint,
            query: query
        });
        console.log('tmdb.get.movie', tmdbURL);
        return axios
            .get(tmdbURL)
            .then(res => {
                /*console.log('=======');
                console.log(res.data);
                console.log(res.data.credits.cast);
                console.log(res.data.credits.crew);
                console.log(res.data.releases);
                console.log(res.data.images);*/
                //if(res.data.total_results > 0){
                logger.info({ message: `INFO Movie "${options.title}" fetch was successful`, label: scriptName, line: __line});
                
                const data = {
                    'Title': res.data.title,
                    'Year': res.data.release_date.substr(0, 4),
                    'Rated': getCertification(res.data),
                    'Released': res.data.release_date,
                    'Genre': getGenre(res.data),
                    'Director': getCrew(res.data.credits, 'Director'),
                    'Writer': getCrew(res.data.credits, 'Screenplay'),
                    'Actors': getCast(res.data.credits, 9),
                    'Plot': res.data.overview,
                    'Language': res.data.original_language,
                    'Country': getCountry(res.data),
                    'Awards': null,
                    //'Poster': 'https://image.tmdb.org/t/p/w260_and_h390_bestv2' + res.data.backdrop_path,
                    'Poster': 'https://image.tmdb.org/t/p/w260_and_h390_bestv2' + res.data.poster_path,
                    'imdbRating': null,
                    'Type': 'movie',
                    'Production': getProduction(res.data)
                };

                //console.log('!!!', data);
                
                return new Movie({...data, libraryId: options.libraryId});
            });
    }

    function tv(options, id) {
        const endpoint = `/tv/${id}`;
        const query = {
            append_to_response: 'credits,releases,images',
            language: 'uk',
            api_key: config.tmdb.apiKey
        };
    
        const tmdbURL = url.format({
            protocol: 'https',
            hostname: 'api.themoviedb.org/3',
            pathname: endpoint,
            query: query
        });
        console.log('tmdb.get.tv', tmdbURL);
        return axios
            .get(tmdbURL)
            .then(res => {
                //console.log('=======');
                //console.log(res.data);
                //console.log(res.data.credits.cast);
                //console.log(res.data.credits.crew);
                //console.log(res.data.releases);
                //console.log(res.data.images);
                //if(res.data.total_results > 0){
                logger.info({ message: `INFO TV "${options.title}" fetch was successful`, label: scriptName, line: __line});
                
                const data = {
                    'Title': res.data.name,  // Name ?
                    'Year': res.data.first_air_date.substr(0, 4),
                    'Rated': null,
                    'Released': res.data.first_air_date,
                    'Genre': getGenre(res.data),
                    'Director': getCrew(res.data.credits, 'Director'),
                    'Writer': getCrew(res.data.credits, 'Screenplay'),
                    'Actors': getCast(res.data.credits, 9),
                    'Plot': res.data.overview,
                    'Language': res.data.original_language,
                    'Country': getCountry(res.data),
                    'Awards': null,
                    //'Poster': 'https://image.tmdb.org/t/p/w260_and_h390_bestv2' + res.data.backdrop_path,
                    'Poster': 'https://image.tmdb.org/t/p/w260_and_h390_bestv2' + res.data.poster_path,
                    'imdbRating': null,
                    'Type': 'tv',
                    'Production': getProduction(res.data)
                };

                //console.log('!!!', data);
                
                return new Movie({...data, libraryId: options.libraryId});
            });
    }

    function getCertification(data) {
        let ret = null;
        if (data.releases && data.releases.countries && Array.isArray(data.releases.countries)) {
            // find US
            data.releases.countries.forEach(el => {
                if (el.iso_3166_1 === 'US') {
                    ret = el.certification;
                }
            })

            // otherwise return first release
            if (!ret && data.releases.countries.length > 0) {
                ret = data.releases.countries[0].certification;
            }
        }

        return ret;
    }

    function getGenre(data) {
        let ret = null;
        if (data.genres && Array.isArray(data.genres)) {
            ret = data.genres.map(el => el.name).join(', ');
        }
        return ret;
    }

    function getCrew(data, job) {
        let ret = null;
        
        if (data.crew && Array.isArray(data.crew)) {
            ret = data.crew.filter(el => (el.job === job)).map(el => el.name).join(', ');
        }
        return ret;
    }

    function getCast(data, limit=9) {
        let ret = null;
        
        if (data.cast && Array.isArray(data.cast)) {
            ret = data.cast.slice(0, limit).map(el => el.name).join(', ');
        }
        return ret;
    }

    function getCountry(data) {
        let ret = null;
        if (data.production_countries && Array.isArray(data.production_countries)) {
            ret = data.production_countries.map(el => el.iso_3166_1).join(', ');
        }
        return ret;
    }

    function getProduction(data) {
        let ret = null;
        if (data.production_companies && Array.isArray(data.production_companies)) {
            ret = data.production_companies.map(el => el.name).join(', ');
        }
        return ret;
    }
};
