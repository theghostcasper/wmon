const os = require("os");
const { spawn, spawnSync } = require("child_process");
const util = require("util");

class Executor {
  constructor(commandToExecute, Logger) {
    this.commandArgs = commandToExecute.split(" ");
    this.command = this.commandArgs.shift(1);
    this.Logger = Logger;
  }

  spawnApplication() {
    const application = spawn(this.command, [...this.commandArgs], { stdio: "inherit" });

    application.on("error", e => {
      this.Logger.yell("Error Spawning Application, check your exec arguments");
    });
    return application;
  }

  killApplication(application) {
    /* For windows Applications*/
    if (os.platform() === "win32") {
      spawnSync("taskkill", ["/pid", application.pid, "/f", "/t"]);
    } else {
      /* For Other operating systems: They are not supported but this will work with most of them. */
      application.kill();
    }
  }
}

module.exports = Executor;
