module.exports = str => {
  let obj = {};
  try {
    obj = JSON.parse(str);
  } catch (e) {
    throw new Error("Failed to parse JSON file: ", e);
  }
  return obj;
};
