const db = require('../database/models/index');
const Settings = require('../database/models/Settings');
const decodeToken = require('../utils/decodeToken');

module.exports = {
  getSettings: async (req, res) => {
    try {
      console.log(req.token, 'TOKEN');
      let settings = await Settings.findAll({
        where: {
          username: req.params.username,
        },
      });
      if (!settings) {
        return res.status(400).json({
          success: false,
          msg: 'Error getting players settings.',
        });
      }
      return res.status(200).json({
        success: true,
        msg: 'Players settings loaded.',
        settings: {
          userId: settings[0].userId,
          lifeLines: settings[0].lifeLines,
          bagCount: settings[0].bagCount,
          wordSuggestions: settings[0].wordSuggestions,
          wordSearch: settings[0].wordSearch,
          darkMode: settings[0].darkMode,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error finding players settings from server.');
    }
  },

  updateSettings: async (req, res) => {
    try {
      const userId = decodeToken(req.token, 'access');
      const { options } = req.params;
      let settings = await Settings.findOne({
        where: {
          userId,
        },
      });
      await Settings.update(
        {
          [options]: !settings[options],
        },
        {
          where: {
            userId,
          },
        }
      );

      return res.status(200).json({
        success: true,
        msg: 'Success. Players settings updated successfully.',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There was an internal error updated user settings.');
    }
  },

  resetSettings: async (req, res) => {
    console.log(req.token)
    try {
      const userId = decodeToken(req.token, 'access');
      const date = new Date(Date.now());

      console.log('RESET SETTINGS');
      await Settings.update(
        {
          updatedAt: date,
          lifeLines: false,
          wordSearch: false,
          wordSuggestions: false,
          bagCount: false,
        },
        {
          where: {
            userId,
          },
        }
      );

      return res.status(200).json({
        success: true,
        msg: 'Success. Players settings reset to default.',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error resetting players settings.');
    }
  },
};
