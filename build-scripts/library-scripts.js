#! /usr/bin/env node
const libsPath = './projects/chapichapi';

const consoleColors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

const output = (outputText, color) => console.log(color, outputText, consoleColors.reset);

/** Takes in an argument for a comma seperated list of libraries (or an individual one) to perform a specific command on each library specified.
 * @param individualLibCommandFunc A callback function of type ```:: libName:string => string```.
 * For example ```(libName) => `dosomethingWith(${libName})` ```
 */
const processLibScript = (individualLibCommandFunc) => {
  const shell = require("shelljs");
  const args = process.argv.slice(1);
  let libs = [];
  if (!args || args.length === 0) {
    const { readdirSync } = require("fs");
    const path = require("path");
    const projectsPath = path.resolve(libsPath);
    output(
      `No library name(s) passed in, getting all libraries from ${projectsPath}.`, consoleColors.fgYellow
    );

    libs = readdirSync(projectsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } else {
    libs = args
      .map((args) => args.split(","))
      .reduce((acc, arg) => acc.concat(arg))
      .map((arg) => arg.trim());
  }

  output(`Running command against ${libs.length} libs:`, consoleColors.fgCyan);
  console.log(libs);

  for (let index = 0; index < libs.length; index++) {
    const lib = libs[index];
    const command = individualLibCommandFunc(lib);
    output(
      "------------------------------------------------------------------------------", consoleColors.fgCyan
    );
    output(`Processing library ${index + 1} of ${libs.length}`, consoleColors.fgCyan);
    output(command, consoleColors.fgCyan);
    output(
      "------------------------------------------------------------------------------", consoleColors.fgCyan
    );
    shell.exec(command);

    output('Task Complete :)', consoleColors.fgCyan);
  }
};

/** ## Get into the folder. Do the command. Get back in time for tea.
 * Required because some `npm` commands don't let you provide an output flag or run against a different directory */
const performCommandInLibDistFolder = (lib, command) =>
  `cd .\\dist\\${lib} && ${command} && cd ../..`;

const build = () => processLibScript((lib) => `ng build ${lib} --prod`);
const pack = () =>
  processLibScript((lib) => performCommandInLibDistFolder(lib, "npm pack"));
const publish = () =>
  processLibScript((lib) => performCommandInLibDistFolder(lib, "npm publish"));

// USAGE:
// All commands can be run using a parameter specifying a single library name or a comma seperated list of library names
// If no parameter is given then all library in the projects folder will be processed
module.exports = {
  build,
  pack,
  publish,

  buildAndPack: () => {
    build();
    pack();
  },
  buildPackAndPublish: () => {
    build();
    pack();
    publish();
  },
};
