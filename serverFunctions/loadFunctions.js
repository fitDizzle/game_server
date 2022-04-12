const db = require("../database/models/index");
const {
  BagLetter,
  Move,
  SavedGame,
  Tile,
  TileObject,
  PlayedWord,
  HighestWordScore,
} = db;
const authorizeUserAccess = require("../middleware/authorize")


const jwt = require("jsonwebtoken");

module.exports = {
  fetchActiveGames: (async (req, res, next) => {
    try {
      console.log("Load all active games", req.token);
      // authorizeUserAccess(req, res, next);

      // console.log(req.headers)
      let decodedToken = jwt.verify(req.headers.authorization, process.env.jwtSecret);
      let infoToReturn = [];

      let savedGames = await SavedGame.findAll({
        where: {
          UserId: decodedToken,
        },
      });

      return res.json({
        success: true,
        msg: "Your games have been loaded",
        savedGames,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error fetching games");
    }
  }),
  loadActiveGame: async (req, res) => {
    try {
      console.log(`Load Saved Game ID: ${req.params.id}`);

      let TileOBJ = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
        l: 0,
        m: 0,
        n: 0,
        o: 0,
        p: 0,
        q: 0,
        r: 0,
        s: 0,
        t: 0,
        u: 0,
        v: 0,
        w: 0,
        x: 0,
        y: 0,
        z: 0,
        blank: 0,
      };

      let activeGame = await SavedGame.findAll({
        where: {
          id: req.params.id,
        },
        include: [
          { model: Move },
          { model: Tile },
          { model: TileObject, include: [{ model: BagLetter }] },
          { model: PlayedWord },
          { model: HighestWordScore },
        ],
      });

      let lockedInMoves = [];
      let currentMoves = [];

      await activeGame[0].Moves.map((move) => {
        let moveToPush = {
          tile: move.tile,
          value: move.tile_value,
          id: move.tile_id,
          parentX: move.tile_parent_x,
          parentY: move.tile_parent_y,
          tileState: move.tile_tilestate,
          isAi: move.tile_isAI == 1 ? true : false,
        };
        if (move.tile_tilestate == "locked") {
          lockedInMoves.push(moveToPush);
        } else {
          currentMoves.push(moveToPush);
        }
      });
      let playerWords = [];
      let aiWords = [];

      await activeGame[0].PlayedWords.map((word) => {
        word.word_played_isPlayer == 1
          ? playerWords.push(word.word_played_word)
          : aiWords.push(word.word_played_word);
      });

      let playerTiles = [];
      let aiTiles = [];
      let exchangeCacheTiles = [];

      await activeGame[0].Tiles.map((tile) => {
        let tileToPush = {
          id: tile.tile_id,
          tile: tile.tile_tile,
          value: tile.tile_value,
        };
        if (tile.isExchangeCache == 1) {
          exchangeCacheTiles.push(tileToPush);
        } else {
          tile.tile_isPlayerTile == 1
            ? playerTiles.push(tileToPush)
            : aiTiles.push(tileToPush);
        }
      });

      let usedTiles = {
        ...TileOBJ,
      };

      let tileBag = {
        ...TileOBJ,
      };

      await activeGame[0].TileObjects.map(async (obj) => {
        await obj.BagLetters.map(async (letter) => {
          if (obj.tile_object_isBag == 1) {
            tileBag[letter.bag_letter_tile] = letter.bag_letter_value;
          } else {
            usedTiles[letter.bag_letter_tile] = letter.bag_letter_value;
          }
        });
      });

      let playerHighestScore;
      let aiHighestScore;

      let filterdPlayerHS = activeGame[0].HighestWordScores.filter(
        (hsObj) => hsObj.highest_word_score_isPlayer === 1
      )[0]

      playerHighestScore = filterdPlayerHS
        ? {
          word: filterdPlayerHS.highest_word_score_word,
          score: filterdPlayerHS.highest_word_score_score,
          multiplier: filterdPlayerHS.highest_word_score_multiplier.split("-")
        }
        : { word: "", score: 0, multiplier: "" };

        let filteredAiHS = activeGame[0].HighestWordScores.filter(
          (hsObj) => hsObj.highest_word_score_isPlayer === 0
        )[0]

      aiHighestScore = filteredAiHS
        ? {
          word: filteredAiHS.highest_word_score_word,
          score: filteredAiHS.highest_word_score_score,
          multiplier: filteredAiHS.highest_word_score_multiplier.split("-")
        }
        : { word: "", score: 0, multiplier: "" };


      res.json({
        success: true,
        msg: "Your game has been loaded",
        activeGame: {
          tiles: {
            tileBag,
            tilesUsed: usedTiles,
            exchangeCache: exchangeCacheTiles,
          },
          player: {
            tiles: playerTiles,
            score: activeGame[0].game_player_score,
            active: activeGame[0].game_isPlayerActive,
            username: activeGame[0].game_username,
            wordsPlayed: playerWords,
            highestWordScore: playerHighestScore
          },
          ai: {
            tiles: aiTiles,
            score: activeGame[0].game_ai_score,
            level: activeGame[0].game_level,
            wordsPlayed: aiWords,
            highestWordScore: aiHighestScore
          },
          plays: {
            lockedIn: lockedInMoves,
            current: currentMoves,
            isPlayerActive:
              activeGame[0].game_isPlayerActive == 1 ? true : false,
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        msg: "There was an error loading your game",
      });
    }
  },
};
