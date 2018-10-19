
const axios = require('axios');
const api = require('./../../config/config');
const omdb = require('./MovieFetchers/omdb');
const tmdb = require('./MovieFetchers/tmdb');

function MovieFetcher() {
    this.fetchers = [
        tmdb,
        omdb
    ];
}

MovieFetcher.prototype.get = function get(options) {
    return this.fetchSequentially(0, options);
};

MovieFetcher.prototype.fetchSequentially =  function fetchSequentially(i, options) {
    return this.fetchers[i](options)
        .catch((e) => {
            console.log(e);
            if ((i + 1) >= this.fetchers.length) {
                return Promise.reject();
            }
            return this.fetchSequentially(i + 1, options);
        })
        .then(res => res);
};

function createInstance() {
    var instance = new MovieFetcher();

    return instance;
}

var fetcher = createInstance();

module.exports = fetcher;
