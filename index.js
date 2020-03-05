#!/usr/bin/env node
const program = require("commander");

function collect(value, previous) {
  return previous.concat([value]);
}

/* Examples */
program.on("--help", function() {
  console.log("");
  console.log("Examples:");
  console.log('  $ wmon -f . -e "node server.js" -x "js, json, py"');
  console.log('  $ wmon -f "src/" -e "node server.js"');
  console.log('  $ wmon -f "src/" -f public -e "node server.js"');
  console.log("  $ wmon -c wmon.config.json");
});

/* Command line rules */
program
  .name("wmon")
  .usage("-f <file or directory> -e <command>")
  .option(
    "-e, --exec <command>",
    "Enter one command to execute when a change occurs, put it between double quotations."
  )
  .option(
    "-f, --files <file/dir>",
    "Enter file/directory to watch between double quotations, see examples below for multiple files",
    collect,
    []
  )
  .option("-c, --config <path>", "Enter the path to a configuration file, there's no default.")
  .option(
    "-d, --saveDebounceDelay <value>",
    "Debounce delay between saves to avoid events from firing twice in milliseconds, default = 10"
  )
  .option("-E, --encoding", "Encoding of the files to watch, default is utf8")
  .option(
    "-s, --no-watchSubdirectories",
    "disable Watching subdirectories nested inside watched directories, enabled by default"
  )
  .option("-x, --ext <extensions>", 'Enter Extensions to watch separated by a comma Default: "js, json"');

program.version("1.1.0", "-v, --vers", "output the current version");
program.parse(process.argv);

const cliInput = {};
cliInput.commandToExecute = program.exec;
cliInput.filesToWatch = program.files;
cliInput.extensionsToWatch = typeof program.ext === "string" && program.ext.length > 1 ? program.ext.split(",") : null;
cliInput.saveDebounceDelay = program.saveDebounceDelay;
cliInput.encoding = program.encoding;
cliInput.watchSubdirectories = program.watchSubdirectories;
cliInput.configurationFile = program.config;
/* merge cli input and json configuration */
const adjustConfiguration = require("./lib/config/adjustConfiguration");
adjustConfiguration(cliInput)
  .then(adjustedConfiguration => {
    /* Initiate the watcher and start watching */
    require("./lib")(adjustedConfiguration);
  })
  .catch(e => {
    throw new Error(e);
  });
