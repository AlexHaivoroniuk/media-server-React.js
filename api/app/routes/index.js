const noteRoutes = require('./note_routes');
const moviesRoutes = require('./movies_routes');
const filtersRoutes = require('./filters_routes');
const userRoutes = require('./user_routes');
const libraryRoutes = require('./library_routes');
module.exports = function(app) {
    noteRoutes(app);
    moviesRoutes(app);
    filtersRoutes(app);
    userRoutes(app);
    libraryRoutes(app)
}