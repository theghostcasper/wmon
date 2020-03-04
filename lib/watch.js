const os = require("os");
const path = require("path");
const fs = require("fs");
const { spawn, spawnSync } = require("child_process");

module.exports = function watch(configuration) {
  const execCommandArgs = configuration.exec.split(" ");
  const execCommand = execCommandArgs.shift(1);
  const options = {
    persistent: true,
    recursive: configuration.watchSubdirectories,
    encoding: configuration.encoding
  };
  startWatching(configuration, options, execCommand, execCommandArgs);
};

function spawnApplication(command, commandArguments) {
  const application = spawn(command, [...commandArguments], { stdio: "inherit" });
  application.on("error", err => {
    console.error("Error while executig your command, Please check the exec command and try again");
  });
  return application;
}

function startWatching(configuration, options, command, commandArguments) {
  let timer;
  let application = spawnApplication(command, commandArguments);
  configuration.filesToWatch.forEach(watchDirectory => {
    watchDirectory = path.join(process.cwd(), watchDirectory);
    fs.watch(watchDirectory, options, (eventType, filename) => {
      if (!timer && changeToMentionedFileOccured(watchDirectory, filename)) {
        application = killApplication(application);
        application = spawnApplication(command, commandArguments);
        /* Debounce delay to avoid events from firing twice. */
        timer = 1;
        setTimeout(function() {
          timer = null;
        }, configuration.debounce);
      }
    });
  });
}

function killApplication(application) {
  /* For windows Applications*/
  if (os.platform() === "win32") {
    const killer = spawnSync("taskkill", ["/pid", application.pid, "/f", "/t"]);
  } else {
    /* For Other operating systems: They are not supported but this will work with most of them. */
    application.kill();
  }
}

function changeToMentionedFileOccured(watchDirectory, filename, requiredExtensions = ["js", "json"]) {
  const extension = (path.extname(watchDirectory) ? path.extname(watchDirectory) : path.extname(filename)).split(
    "."
  )[1];
  if (requiredExtensions.includes(extension)) {
    console.log("Files Changed, Restarting");
    return true;
  }
  return false;
}
