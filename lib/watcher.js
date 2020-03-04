const path = require("path");
const fs = require("fs");
const checkFileChange = require("../utils/checkFileChange");

class Watcher {
  watcher = null;
  constructor(
    { filesToWatch, extensionsToWatch, commandToExecute, saveDebounceDelay, encoding, watchSubdirectories },
    Executor,
    Logger
  ) {
    this.filesToWatch = filesToWatch;
    this.commandToExecute = commandToExecute;
    this.extensionsToWatch = extensionsToWatch;
    this.saveDebounceDelay = saveDebounceDelay;
    this.watchOptions = {
      persistent: true,
      recursive: watchSubdirectories,
      encoding: encoding
    };
    this.Logger = Logger;
    this.executor = new Executor(commandToExecute, Logger);
  }

  startWatching() {
    this.Logger.greet("Starting Your Command: ", this.commandToExecute);
    this.Logger.greet("Watching the following Directories: ", this.filesToWatch);
    this.Logger.greet("Watching for those extensions: ", this.extensionsToWatch);
    this.Logger.greet("file watcher encoding: ", this.watchOptions.encoding);
    this.Logger.greet("recursive watch: ", this.watchOptions.recursive);

    let timer;
    let application = this.executor.spawnApplication();
    this.filesToWatch.forEach(watchDirectory => {
      watchDirectory = path.join(process.cwd(), watchDirectory);
      this.watcher = fs.watch(watchDirectory, this.watchOptions.options, (eventType, filename) => {
        if (!timer && checkFileChange(watchDirectory, filename, this.extensionsToWatch)) {
          this.Logger.greet("Change is triggered, restarting the application: ", this.commandToExecute);
          application = this.executor.killApplication(application);
          application = this.executor.spawnApplication();
          /* Debounce delay to avoid events from firing twice. */
          timer = 1;
          setTimeout(function() {
            timer = null;
          }, this.saveDebounceDelay);
        }
      });
    });
  }

  stopWatching() {
    watcher.close();
  }
}

module.exports = Watcher;
