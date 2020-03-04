#!/usr/bin/env node
const program = require("commander");

function collect(value, previous) {
  return previous.concat([value]);
}

/* Examples */
program.on("--help", function() {
  console.log("");
  console.log("Examples:");
  console.log('  $ wmon -f . -e "node server.js"');
  console.log('  $ wmon -f "src/" -e "node server.js"');
  console.log('  $ wmon -f "src/" -f public -e "node server.js"');
  console.log("  $ wmon -c wmon.config.json");
});

const defaults = {
  exec: "node index.js",
  filesToWatch: ["./"],
  debounce: 10,
  encoding: "utf8",
  watchSubdirectories: true,
  configFile: null
};

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
    "-d, --debounce <value>",
    "Debounce delay between saves to avoid events from firing twice in milliseconds, default = 10"
  )
  .option("-E, --encoding", "Encoding of the files to watch, default is utf8")
  .option(
    "-s, --no-watchSubdirectories",
    "disable Watching subdirectories nested inside watched directories, enabled by default"
  );

program.parse(process.argv);

const exec = program.exec || defaults.exec;
const filesToWatch = program.files.length > 0 ? program.files : defaults.filesToWatch;
const debounce = program.debounce || defaults.debounce;
const encoding = program.encoding || defaults.encoding;
const watchSubdirectories = program.watchSubdirectories;
const configFile = program.config;
const adjustConfiguration = require("./lib");
const watch = require("./lib/watch");
const adjustedConfiguration = adjustConfiguration(
  exec,
  filesToWatch,
  debounce,
  encoding,
  watchSubdirectories,
  configFile
);
watch(adjustedConfiguration);
