const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    "critical-bundle": "./js/critical.js",
    "main-bundle": "./js/script.js",
    "vendors-bundle": "./js/lazy-loader.js",
    "performance-optimizer": "./js/performance-optimizer.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true
  },
  optimization: {
    splitChunks: { chunks: "all" }
  }
};
