#! /usr/bin/env node
const libsPath = "./projects/chapichapi";
const angularJsonPath = "./angular.json";
const scopeName = "@chapichapi";
const showcaseProjectName = "angular-component-library";
const libPrefix = "ngx-";
const ensurePrefix = (libName) => libPrefix?
  `${libPrefix}${libName.replace(libPrefix, "")}` : libName;
const ensurescopeName = (libName) => scopeName?
`${scopeName.replace('@', '')}\\${libName.replace(scopeName, "")}` : libName;
const isPublicScope = true;

const waitOnFile = "public-api.d.ts";

const consoleColors = {
  reset: "\x1b[0m",
  fgCyan: "\x1b[36m",
};

const output = (outputText) =>
  console.log(consoleColors.fgCyan, outputText, consoleColors.reset);

const getProjectNames = () =>
  require("fs")
    .readdirSync(libsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getLibArgs = (getAllProjectsIfNoArgs = true) => {
  const args = process.argv.slice(1);
  let libs = [];
  if ((getAllProjectsIfNoArgs && !args) || args.length === 0) {
    const path = require("path");
    const projectsPath = path.resolve(libsPath);
    output(
      `No library name(s) passed in, getting all libraries from ${projectsPath}.`
    );

    libs = getProjectNames();
  } else {
    if (args.length === 0) {
      output("You must specify a library name!");
      return;
    }
    libs = args
      .map((args) => args.split(","))
      .reduce((acc, arg) => acc.concat(arg))
      .map((arg) => arg.trim());
  }
  return libs;
};

/** Takes in an argument for a comma seperated list of libraries (or an individual one) to perform a specific command on each library specified.
 * @param individualLibCommandFunc A callback function of type ```:: libName:string => string```.
 * @param getAllProjectsIfNoArgs If set to true then will run command against all projects in projects folder if no args are passed in.
 * For example ```(libName) => `dosomethingWith(${libName})` ```
 */
const processLibScript = (
  individualLibCommandFunc,
  getAllProjectsIfNoArgs = true
) => {
  const libs = getLibArgs(getAllProjectsIfNoArgs);
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
    const shell = require("shelljs");
    shell.exec(command);

    output("Task Complete :)");
  }
  return libs;
};

/** ## Get into the folder. Do the command. Get back in time for tea.
 * Required because some `npm` commands don't let you provide an output flag or run against a different directory */
const performCommandInLibDistFolder = (lib, command) =>
  `cd .\\dist\\${ensurescopeName(ensurePrefix(lib))} && ${command} && cd ../..`;

const build = (watch) =>
  processLibScript((lib) => `ng build ${lib} ${watch ? "--watch" : ""}`);
const pack = () =>
  processLibScript((lib) => performCommandInLibDistFolder(lib, "npm pack"));
const publish = () =>
  processLibScript((lib) =>
    performCommandInLibDistFolder(lib, `npm publish${isPublicScope ? ' --access public' : ''}`)
  );
const add = () =>
  processLibScript(
    (lib) =>
      `ng generate library ${ensurescopeName(ensurePrefix(lib))} && npm run libs:tidyAngularJson`,
    false
  );
const remove = () =>
  processLibScript((lib) => `rimraf ${libsPath}\\ngx-${lib}`, false);

const tidyAngularJson = () => {
  const fs = require("fs");

  const libNames = getProjectNames();
  const ngJson = JSON.parse(fs.readFileSync(angularJsonPath));
  const ngJsonProjects = ngJson.projects;

  output("Current Projects in angular.json:");
  console.log(Object.keys(ngJsonProjects));

  Object.keys(ngJsonProjects)
    .filter((x) => x !== showcaseProjectName)
    .forEach((longLibName) => {
      const trimmedLibName = longLibName.replace(`${scopeName}/`, "");
      if (longLibName.startsWith(`${scopeName}/`)) {
        console.log(
          `${longLibName} needs to be shortened to ${trimmedLibName}`
        );
        ngJsonProjects[trimmedLibName] = ngJsonProjects[longLibName]; // create new key with old key value
        delete ngJsonProjects[longLibName]; // then remove old key
      }
      if (!libNames.some((x) => x === longLibName || x === trimmedLibName)) {
        output(
          `${longLibName} was found in angular.json but not in ${libsPath} - DELETING FROM ANGULAR.JSON`
        );
        delete ngJsonProjects[longLibName]; // remove key as no associated project
      }
    });
  console.log(ngJsonProjects);
  ngJson.projects = ngJsonProjects;
  fs.writeFileSync(angularJsonPath, JSON.stringify(ngJson, null, 4));
};

const getLibDependenciesToWaitOn = (libName) => {
  const fs = require("fs");
  const packageJson = JSON.parse(
    fs.readFileSync(`dist\\${ensurescopeName(ensurePrefix(libName))}\\package.json`)
  );
  const peerDependencies = packageJson.peerDependencies;
  if (peerDependencies) {
    const projects = getProjectNames();
    const dependencies = Object.keys(peerDependencies).filter(
      (key) => projects.indexOf(key) > -1
    );
    if (dependencies.length > 0) {
      output(`Found ${dependencies.length} project dependencies dependencies in ${libName}`);
      console.log(dependencies);
      return `wait-on ${dependencies
        .map((x) => `dist\\${ensurescopeName(ensurePrefix(x))}\\${waitOnFile}`)
        .join(" ")} && `;
    }
  }
  return "";
};

const buildAndServe = () => {
  const concurrently = require("concurrently");
  const libs = getLibArgs(false).map((x) => ensurePrefix(x));
  output(libs);

  const projectNames = getProjectNames();
  const preBuiltProjects = getProjectNames("./dist" + scopeName ? `/${scopeName}` : '');
  const unBuiltProjects = projectNames.filter(
    (x) => preBuiltProjects.indexOf(x) === -1 && libs.indexOf(x) === -1
  );
  const filesToWaitOn = libs
    .map((lib) => `dist\\${ensurescopeName(ensurePrefix(lib))}\\${waitOnFile}`)
    .join(" ");
  const waitAndServeCommand = `wait-on ${filesToWaitOn} && ng serve`;
  const libCommands = libs.map(
    (lib) =>
      `rimraf dist\\${ensurescopeName(ensurePrefix(lib))} && ${getLibDependenciesToWaitOn(
        lib,
        libs
      )}ng build ${lib} --watch`
  );
  if (unBuiltProjects.length > 0) {
    output("Unbuilt Projects found:");
    console.log(unBuiltProjects);
    libCommands.push(unBuiltProjects.map((x) => `ng build ${x}`).join(" && "));
  }
  libCommands.push(waitAndServeCommand);
  output(`${libCommands.length} commands to run concurrently:`);
  output(libCommands);
  concurrently(libCommands).then(() => output("All Done :)"));
};

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

  add,
  remove: () => {
    remove();
    tidyAngularJson();
  },

  tidyAngularJson,

  buildAndServe,
};
