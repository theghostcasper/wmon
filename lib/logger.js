const chalk = require("chalk");

class Logger {
  static warn(...data) {
    console.log(chalk.yellow(...data));
  }
  static greet(...data) {
    console.log(chalk.green(...data));
  }
  static yell(...data) {
    console.log(chalk.red(...data));
  }
}

module.exports = Logger;
