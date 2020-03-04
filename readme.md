# WMON

Simple and light watcher that can replace [nodemon](https://www.npmjs.com/package/nodemon) for windows users.

# Installation

you can install globally

`npm install -g wmon`

or as a development dependency

`npm install --save-dev wmon`

# Usage

wmon was developed to be used in command line

usage is very similar to nodemon

`wmon -f <file/directory> -e <command to execute>`

For CLI options, use the -h, --help, or help argument

Filename or directory should be wrapped with double quotation marks

Example: `wmon -f "./" -e "node index.js"`

Multiple file example:

`wmon -f "./src" -f "./dest" -f "public/index.html"`

## How it works

Simply wmon will watch your files for any changes, and once a change is triggered it will re execute the supplied command, by default it is "node index.js"

For example

`wmon -f "./" -e "node server.js"`

This will execute "node server.js" command and start the server. Once any change occur to the watched files or directories, the command will be executed again

You can also supply extensions to watch, by default js and json are set.

`wmon -f "./" -e "node server.js" -x "js, json, py"`

# Config files

Here's an example of a configuration file

the saveDebounceDelay adds a delay between saves, to prevent the execution command from being executed twice at the same time. By default it is set to 50ms, feel free to adjust it to your needs.

`{ "exec": "node index.js", "ext": ["js", "python"], "files": ["./"], "saveDebounceDelay": 50, "encoding": "latin1", "watchSubdirectories": true }`

The configuration file should be in JSON format, and You should supply the configuration file as a command line argument. Config files have higher priority than the command line arguments.

`wmon --config wmon.config.json`
