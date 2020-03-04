const fs = require("fs").promises;
const parseJson = require("../../utils/parseJson");

module.exports = async filePath => {
  const data = await fs.readFile(filePath).catch(e => {
    throw new Error("Error reading JSON configuration file: ", e);
  });
  return parseJson(data);
};
