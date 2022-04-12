const loadFunctions = require('../serverFunctions/loadFunctions');

module.exports = {
    fetchActiveGames: loadFunctions.fetchActiveGames,
    loadActiveGame: loadFunctions.loadActiveGame
};