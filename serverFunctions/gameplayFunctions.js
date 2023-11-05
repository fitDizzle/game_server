const { Op } = require("sequelize");
const User = require('../database/models/User');
const BagLetter = require('../database/models/BagLetter');
const Move = require('../database/models/Move');
const SavedGame = require('../database/models/SavedGame');
const Tile = require('../database/models/Tile');
const TileObject = require('../database/models/TileObject');
const PlayedWord = require('../database/models/PlayedWord');
const HighestWordScore = require('../database/models/HighestWordScore');

module.exports = {
  validateWord: async (req, res) => {
    try {
      console.log("Validate Word");
      console.log(req.params);
    } catch (error) {
      console.log(error);
      res.status(500).send("There was an error with dictionary server");
    }
  },

  saveActiveGame: async (req, res) => {
    try {
      console.log("Save Game");
      const { player, ai, tiles, plays } = req.body;
      let user = await User.findOne({
        where: {
          username: player.username,
        },
      });
      const { id: userId } = user;

      let newSavedGame = await SavedGame.create({
        UserId: userId,
        game_username: player.username,
        game_player_score: player.score,
        game_ai_score: ai.score,
        game_isPlayerActive: plays.isPlayerActive ? 1 : 0,
        game_isActive: 1,
        game_level: ai.level,
      });

      const allPlays = [...plays.lockedIn, ...plays.current];
      let movesArray = allPlays.map((play) => {
        let { tile, id, value, parentX, parentY, tileState, isAI } = play;
        return {
          tile: tile,
          tile_value: value,
          tile_id: id,
          tile_parent_x: parentX,
          tile_parent_y: parentY,
          tile_tilestate: tileState,
          tile_isAI: isAI ? 1 : 0,
          SavedGameId: newSavedGame.id,
        };
      });

      await Move.bulkCreate(movesArray, { validate: true });

      let allTiles = Array.isArray(tiles.exchangeCache)
        ? [...player.tiles, ...ai.tiles, ...tiles.exchangeCache]
        : [...player.tiles, ...ai.tiles];

      let tilesArray = allTiles.map((tile) => {
        let { tile: letter, id, value } = tile;
        // console.log(letter)
        let bool = tile.id.includes("PLAYER") ? 1 : 0;
        // console.log(bool)
        let exchangeCache = Array.isArray(tiles.exchangeCache)
          ? tiles.exchangeCache.filter((tile) => tile.id == id).length > 0
            ? 1
            : 0
          : 0;
        return {
          tile_tile: letter,
          tile_value: value,
          tile_id: id,
          tile_isPlayerTile: bool,
          tile_isExchangeCache: exchangeCache,
          SavedGameId: newSavedGame.id,
        };
      });
      // console.log(tilesArray)
      await Tile.bulkCreate(tilesArray, { validate: true });
      // console.log(newTiles)
      let newTileBag = await TileObject.create({
        tile_object_isBag: 1,
        SavedGameId: newSavedGame.id,
      });

      let newUsedTiles = await TileObject.create({
        tile_object_isBag: 0,
        SavedGameId: newSavedGame.id,
      });

      let bagTilesArray = Object.keys(tiles.tileBag).map((tile) => {
        return {
          bag_letter_tile: tile,
          bag_letter_value: tiles.tileBag[tile],
          TileObjectId: newTileBag.id,
        };
      });

      let usedTilesArray = Object.keys(tiles.tilesUsed).map((tile) => {
        return {
          bag_letter_tile: tile,
          bag_letter_value: tiles.tilesUsed[tile],
          TileObjectId: newUsedTiles.id,
        };
      });
      // console.log(usedTilesArray)

      await BagLetter.bulkCreate(bagTilesArray, { validate: true });
      await BagLetter.bulkCreate(usedTilesArray, { validate: true });
      // console.log(bagTilesArray)
      let playerWords = player.wordsPlayed.map((word) => {
        return {
          word_played_word: word,
          word_played_isPlayer: 1,
          SavedGameId: newSavedGame.id,
        };
      });

      if (playerWords.length > 0) {
        await PlayedWord.bulkCreate(playerWords, { validate: true });
      }

      let aiWords = ai.wordsPlayed.map((word) => {
        return {
          word_played_word: word,
          word_played_isPlayer: 0,
          SavedGameId: newSavedGame.id,
        };
      });

      if (aiWords.length > 0) {
        await PlayedWord.bulkCreate(playerWords, { validate: true });
      }

      if (player.highestWordScore.score > 0) {
        console.log("met score over zero" + player.highestWordScore.score);
        const { word, score, multiplier } = player.highestWordScore;
        await HighestWordScore.create({
          highest_word_score_word: word,
          highest_word_score_score: score,
          highest_word_score_multiplier: multiplier.join("-"),
          highest_word_score_isPlayer: 1,
          SavedGameId: newSavedGame.id,
        });
      }
      if (ai.highestWordScore.score > 0) {
        const { word, score, multiplier } = ai.highestWordScore;
        await HighestWordScore.create({
          highest_word_score_word: word,
          highest_word_score_score: score,
          highest_word_score_multiplier: multiplier.join("-"),
          highest_word_score_isPlayer: 1,
          SavedGameId: newSavedGame.id,
        });
      }

      return res.json({
        success: true,
        msg: "Your game has been saved",
        gameId: newSavedGame.id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        msg: "There was an error saving your game",
      });
    }
  },
  updateActiveGame: async (req, res) => {
    try {
      console.log("Update Game Route", req.params.id);

      const { player, ai, tiles, plays } = req.body;
      const { id: gameId } = req.params;

      let savedGame = await SavedGame.findOne({
        where: {
          id: gameId,
        },
        include: [
          { model: Move },
          { model: Tile },
          { model: TileObject, include: [{ model: BagLetter }] },
          { model: PlayedWord },
          { model: HighestWordScore },
        ],
      });

      if (
        savedGame.game_player_score !== player.score ||
        savedGame.game_ai_score !== ai.score
      ) {
        await savedGame.update(
          {
            game_player_score: player.score,
            game_ai_score: ai.score,
          },
          { fields: ["game_player_score", "game_ai_score"] }
        );
      }

      const allPlays = [...plays.lockedIn, ...plays.current];
      let movesArray = allPlays.map((play) => {
        let { tile, id, value, parentX, parentY, tileState, isAI } = play;
        return {
          tile: tile,
          tile_value: value,
          tile_id: id,
          tile_parent_x: parentX,
          tile_parent_y: parentY,
          tile_tilestate: tileState,
          tile_isAI: isAI ? 1 : 0,
          SavedGameId: parseInt(gameId),
        };
      });

      if (savedGame.Moves.length !== movesArray.length) {
        console.log("met moves diff");

        await Move.destroy({
          where: {
            SavedGameId: gameId,
          },
        });

        await Move.bulkCreate(movesArray, { validate: true });
      }

      let allTiles = [...player.tiles, ...ai.tiles, ...tiles.exchangeCache];

      let tilesArray = await allTiles.map((tile) => {
        let { tile: letter, id, value } = tile;
        // console.log(letter)
        let bool = tile.id.includes("PLAYER") ? 1 : 0;
        // console.log(bool)
        let exchangeCache =
          tiles.exchangeCache !== "cleared"
            ? tiles.exchangeCache.filter((tile) => tile.id == id).length > 0
              ? 1
              : 0
            : 0;
        return {
          tile_tile: letter,
          tile_value: value,
          tile_id: id,
          tile_isPlayerTile: bool,
          tile_isExchangeCache: exchangeCache,
          SavedGameId: gameId,
        };
      });

      await Tile.destroy({
        where: {
          SavedGameId: gameId,
        },
      });
      await Tile.bulkCreate(tilesArray, { validate: true });

      let BagId = savedGame.TileObjects.filter(
        (tileObj) => tileObj.tile_object_isBag === 1
      )[0].id;
      let UsedTilesId = savedGame.TileObjects.filter(
        (tileObj) => tileObj.tile_object_isBag === 0
      )[0].id;

      console.log(BagId);

      await BagLetter.destroy({
        where: {
          TileObjectId: {
            [Op.or]: [BagId, UsedTilesId],
          },
        },
      });

      let bagTilesArray = Object.keys(tiles.tileBag).map((tile) => {
        return {
          bag_letter_tile: tile,
          bag_letter_value: tiles.tileBag[tile],
          TileObjectId: BagId,
        };
      });

      let usedTilesArray = Object.keys(tiles.tilesUsed).map((tile) => {
        return {
          bag_letter_tile: tile,
          bag_letter_value: tiles.tilesUsed[tile],
          TileObjectId: UsedTilesId,
        };
      });

      await BagLetter.bulkCreate(bagTilesArray, { validate: true });
      await BagLetter.bulkCreate(usedTilesArray, { validate: true });

      let playerWords = player.wordsPlayed.map((word) => {
        return {
          word_played_word: word,
          word_played_isPlayer: 1,
          SavedGameId: gameId,
        };
      });

      if (
        playerWords.length >
        savedGame.PlayedWords.filter((word) => word.word_played_isPlayer === 1)
          .length
      ) {
        await PlayedWord.destroy({
          where: {
            [Op.and]: [
              {
                SavedGameId: gameId,
              },
              {
                word_played_isPlayer: 1,
              },
            ],
          },
        });
        await PlayedWord.bulkCreate(playerWords, { validate: true });
      }

      let aiWords = ai.wordsPlayed.map((word) => {
        return {
          word_played_word: word,
          word_played_isPlayer: 0,
          SavedGameId: gameId,
        };
      });

      // if (
      //   aiWords.length >
      //   savedGame.PlayedWords.filter((word) => word.word_played_isPlayer === 0)
      //     .length
      // ) {
      //   await PlayedWord.destory({
      //     where: {
      //       [Op.and]: [
      //         {
      //           SavedGameId: gameId,
      //         },
      //         {
      //           word_played_isPlayer: 0,
      //         },
      //       ],
      //     },
      //   });

      //   await PlayedWord.bulkCreate(aiWords, { validate: true });
      // }

      if (
        player.highestWordScore.score >
        savedGame.HighestWordScores.filter(
          (score) => score.highest_word_score_isPlayer === 1
        )[0].highest_word_score_score
      ) {
        console.log("met score over zero" + player.highestWordScore.score);
        const { word, score, multiplier } = player.highestWordScore;

        await HighestWordScore.update(
          {
            highest_word_score_score: score,
            highest_word_score_word: word,
            highest_word_score_multiplier: multiplier.join(""),
          },
          {
            where: {
              [Op.and]: [
                {
                  SavedGameId: gameId,
                },
                {
                  highest_word_score_isPlayer: 1,
                },
              ],
            },
          }
        );
      }

      return res.json({
        success: true,
        msg: "Your saved game has been updated",
        savedGame,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        msg: "There was an error updating your game in the database",
      });
    }
  },

  deleteActiveGame: async (req, res) => {
    console.log("DELETE GAME");
    let gameId = parseInt(req.params.id);

    try {
      await SavedGame.destroy({
        where: {
          id: gameId,
        },
      });

      return res.json({
        gameId: gameId,
        success: true,
        msg: "Game has successfully been deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        msg: "There was an error deleting the selected game.",
      });
    }
  },
};
