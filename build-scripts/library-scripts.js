#! /usr/bin/env node
const libsPath = './projects/chapichapi';

const consoleColors = {
  reset: "\x1b[0m",
  fgCyan: "\x1b[36m",
};

const output = (outputText) => console.log(consoleColors.fgCyan, outputText, consoleColors.reset);

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
      `No library name(s) passed in, getting all libraries from ${projectsPath}.`
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

  output(`Running command against ${libs.length} libs:`);
  console.log(libs);

  for (let index = 0; index < libs.length; index++) {
    const lib = libs[index];
    const command = individualLibCommandFunc(lib);
    output(
      "------------------------------------------------------------------------------"
    );
    output(`Processing library ${index + 1} of ${libs.length}`);
    output(command);
    output(
      "------------------------------------------------------------------------------"
    );
    shell.exec(command);

    output('Task Complete :)');
  }
};

/** ## Get into the folder. Do the command. Get back in time for tea.
 * Required because some `npm` commands don't let you provide an output flag or run against a different directory */
const performCommandInLibDistFolder = (lib, command) =>
  `cd .\\dist\\${lib} && ${command} && cd ../..`;

const build = (watch) => processLibScript((lib) => `ng build ${lib} ${watch ? '--watch' : ''}`);
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
