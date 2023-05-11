const config = require("./webpack-config");
module.exports = config.get_module_export(
  "./src/client/dev_index.ts",
  "development"
);
