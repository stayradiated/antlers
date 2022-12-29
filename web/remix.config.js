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

    'cache-manager-better-sqlite3',
      'cbor-x',
    
    'p-map',
      'aggregate-error',
      'clean-stack',
      'indent-string'
  ]
};
