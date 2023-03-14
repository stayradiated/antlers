const process = require('node:process')

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  publicPath: `${process.env.BASE_PATH ?? '/'}build/`,
  serverDependenciesToBundle: [
    'photoswipe',
      'photoswipe/lightbox', 

    'escape-string-regexp',

    'cache-manager-better-sqlite3',
      'cbor-x',
    
    'p-map',
      'aggregate-error',
      'clean-stack',
      'indent-string',

    'p-debounce'
  ]
};
