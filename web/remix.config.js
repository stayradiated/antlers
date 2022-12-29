/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    'photoswipe',
      'photoswipe/lightbox', 

    'escape-string-regexp',

    'cache-manager-better-sqlite3',
      'cbor-x',
      'better-sqlite3',
        'bindings',
        'file-uri-to-path',
    
    'p-map',
      'aggregate-error',
      'clean-stack',
      'indent-string'
  ]
};
