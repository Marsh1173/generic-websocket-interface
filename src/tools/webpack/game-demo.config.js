const config = require("./webpack-config");
module.exports = config.get_module_export(
  "./src/model/game/gamedemorunner/index.tsx",
  "development",
  false
);
