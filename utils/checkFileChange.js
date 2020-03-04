const path = require("path");

module.exports = (watchDirectory, filename, extensionsToWatch) => {
  const extension = (path.extname(watchDirectory) ? path.extname(watchDirectory) : path.extname(filename)).split(
    "."
  )[1];
  if (extensionsToWatch.includes(extension)) {
    return true;
  }
  return false;
};
