const gameplayFunctions = require('../serverFunctions/gameplayFunctions');

module.exports = {
    validateWord: gameplayFunctions.validateWord,
    saveActiveGame: gameplayFunctions.saveActiveGame,
    updateActiveGame: gameplayFunctions.updateActiveGame,
    deleteActiveGame: gameplayFunctions.deleteActiveGame,
};