const settingsFunctions = require("../serverFunctions/settingsFunctions");

module.exports = {
  getSettings: settingsFunctions.getSettings,
  updateSettings: settingsFunctions.updateSettings,
  resetSettings: settingsFunctions.resetSettings,
};
